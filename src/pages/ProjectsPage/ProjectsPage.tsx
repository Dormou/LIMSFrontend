import { useEffect, useRef, useState } from "react"

import styles from './ProjectsPage.module.scss'
import { Search } from "../components/Search/Search"
import { Filter } from "../components/Filter/Filter"
import { useFetchProjectsArchiveQuery, useFetchProjectsQuery } from "../../connect/projectsApi/projectsApi"
import ReactLoading from "react-loading"
import { Project } from "./components/Project/Project"
import { useDispatch } from "react-redux"
import { setShowFooter } from "../../connect/store"
import { ProjectArchive } from "./components/ProjectArchive/ProjectArchive"
import { ItemTypes } from "./Types"
import { useDrop } from "react-dnd"
import { Card, CardArchive, ProjectArchive as ProjectArchiveType, Project as ProjectType} from "../../connect/projectsApi/Types"

enum Scene {
    Applicataions = 'Заявки',
    Active = 'Активные проекты',
    Archive = 'Архив'
}

export const ProjectsPage = () => {
    const dispatch = useDispatch()

    const {isLoading, data} = useFetchProjectsQuery({offset: 0, size: 20})
    const {isLoading: archiveIsLoading, data: archiveData} = useFetchProjectsArchiveQuery({offset: 0, size: 20})
    
    const [projects, setProjects] = useState(data? data.projects: [])
    const [projectsArchive, setProjectsArchive] = useState(archiveData? archiveData.projects: [])
    
    const [scene, setScene] = useState(Scene.Applicataions)

    useEffect(() => {
        //типа запрос на измение карточек
    }, [projects])

    useEffect(() => {
        //типа запрос на измение карточек
    }, [projectsArchive])
    
    useEffect(() => setProjects(data? data.projects: []), [isLoading])
    useEffect(() => setProjectsArchive(archiveData? archiveData.projects: []), [archiveIsLoading])
    
    dispatch(setShowFooter(false))

    const filterByCountLetters5 = () => setProjects(projects.filter(v => v.name.length <= 5))
    const filterByZeroCards  = () => {
        console.log('ssssss')
        setProjects(projects.filter(v => v.cards.length < 1))
    }
    const withoutFilters = () => setProjects(data? data.projects: [])

    const search = (v: string) => v
        ? setProjects(projects.filter(p => p.name.includes(v)))
        : setProjects(data? data.projects: [])
    
    const searchArchive = (v: string) => v
        ? setProjectsArchive(projectsArchive.filter(p => p.name.includes(v)))
        : setProjectsArchive(archiveData? archiveData.projects: [])

    const changeCards = (projectId: string, cards: Card[]) => {
        const project = {...projects.find(p => p.id === projectId)} as ProjectType

        if(project) project.cards = cards
        else return

        setProjects(projects.map(p => p.id !== project.id? p: project))
    }

    const changeCardsArchive = (projectId: string, cards: CardArchive[]) => {
        const projectArchive = {...projectsArchive.find(p => p.id === projectId)} as ProjectArchiveType

        if(projectArchive) projectArchive.cards = cards
        else return

        setProjectsArchive(projectsArchive.map(p => p.id !== projectArchive.id? p: projectArchive))
    }
  

    return (
        <div className={styles.main}>
            <h1>Проведение испытании</h1>
            {!isLoading && data &&
                <>
                    <div className={styles.SearchAndFilter}>
                        {scene !== Scene.Archive && <button className={styles.addProject}>Создать проект</button>}
                        <div className={styles.search}>
                            <Search callback={scene === Scene.Archive? searchArchive: search}/>
                        </div>
                        <Filter 
                            filterAfterSelected={true}
                            items={projects}
                            filters={[
                                {name: 'без фильтров', filter: withoutFilters},
                                {name: 'название до 5 букв', filter: filterByCountLetters5},
                                {name: 'Проекты без карточек', filter: filterByZeroCards},
                            ]}
                        />
                    </div>
                    <div className={styles.sceneHeader}>
                        {Object.values(Scene).map(s => 
                            <div onClick={() => setScene(s)} className={s === scene? styles.switchSelectedScene: styles.switchScene}>{s}</div>
                        )}
                    </div>

                </>
            }
            <div className={styles.scene}>
                <>
                    {!isLoading && scene === Scene.Applicataions &&
                        <div className={styles.projects}>
                            {projects.filter(p => !p.isProcess).map(p => 
                                <div key={p.id} className={styles.project}>
                                    <Project 
                                        id={p.id}
                                        changeCards={changeCards}
                                        name={p.name}                                         
                                        cards={p.cards} 
                                        deadline={p.deadline} 
                                        tester={p.tester}
                                        producer={p.producer}
                                        TYC={p.TYC}
                                    />
                                </div>
                            )}
                        </div>
                    }
                    {!isLoading && scene === Scene.Active &&
                        <div className={styles.projects}>
                            {projects.filter(p => p.isProcess).map(p => 
                                <div key={p.id} className={styles.project}>
                                    <Project 
                                        id={p.id}
                                        changeCards={changeCards}
                                        name={p.name}                                         
                                        cards={p.cards} 
                                        deadline={p.deadline} 
                                        tester={p.tester}
                                        producer={p.producer}
                                        TYC={p.TYC}
                                    />
                                </div>
                            )}
                        </div>
                    }
                    {!archiveIsLoading && scene === Scene.Archive &&
                        <div className={styles.archive}>
                            <div className={styles.projects}>
                                {projectsArchive.filter(p => !p.isProcess).map(p => 
                                    <div key={p.id} className={styles.project}>
                                        <ProjectArchive 
                                            id={p.id}
                                            changeCards={changeCardsArchive}
                                            name={p.name}                                         
                                            cards={p.cards} 
                                            deadline={p.deadline} 
                                            producer={p.producer}
                                            release={p.release}
                                            tester={p.tester}
                                            TYC={p.TYC}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                    {isLoading && scene !== Scene.Archive &&
                    <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                    }
                    {archiveIsLoading && scene === Scene.Archive &&
                        <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                    }
                </>
            </div>
        </div>
    )
}