import { useEffect, useRef, useState } from "react"

import styles from './ProjectsPage.module.scss'
import { Search } from "../components/Search/Search"
import { Filter } from "../components/Filter/Filter"
import { useFetchProjectsArchiveQuery, useFetchProjectsQuery, useGetStatusProjectQuery, useLazyFetchProjectsQuery, useLazyGetStatusProjectQuery } from "../../connect/projectsApi/projectsApi"
import ReactLoading from "react-loading"
import { Project } from "./components/Project/Project"
import { useDispatch, useSelector } from "react-redux"
import { setShowFooter } from "../../connect/store"
import { ProjectArchive } from "./components/ProjectArchive/ProjectArchive"
import { ItemTypes } from "./Types"
import { useDrop } from "react-dnd"
import { TestGroup, CardArchive, ProjectArchive as ProjectArchiveType, Project as ProjectType, Test, CurrentStatus, Executor, Applicant, DeviceType} from "../../connect/projectsApi/Types"
import { TestGroup as ApplicataionTestGroup, Application as ApplicationType} from "../../connect/applicationsApi/Types"
import { EditCardForm } from "./components/Project/components/Card/components/EditCardForm/EditCardForm"
import { Application } from "./components/Application/Application"
import { useFetchApplicationsQuery, useLazyFetchApplicationsQuery } from "../../connect/applicationsApi/applicationsApi"
import { ApplicationStatusResponse } from "../../connect/applicationsApi/Responses"

enum Scene {
    Applicataions = 'Заявки',
    Active = 'Активные проекты',
    Archive = 'Архив',
}

type ProjectView = {
    guid: string;
    dateOfCreation: string;
    dateOfLastUpdate: string;
    executor: Executor;
    application: ApplicationProjectType;
    deadline: Date;
    dutRegistrationData: string;
    tests: Test
}

type ApplicationProjectType = {
    guid: string;
    dateOfCreation: string;
    dateOfLastUpdate: string;
    currentStatus: CurrentStatus;
    applicant: Applicant;
    deviceModel: string;
    deviceType: DeviceType;
    comment: string;
}

export const ProjectsPage = () => {
    const dispatch = useDispatch()

    const [getProjects, projectsData] = useLazyFetchProjectsQuery()
    const [applicationsGet, applicationsData] = useLazyFetchApplicationsQuery()

    const {isLoading: archiveIsLoading, data: archiveData} = useFetchProjectsArchiveQuery({offset: 0, size: 20})
    
    const [editingCard, setEditingCard] = useState({} as Test)
    const [projects, setProjects] = useState([] as ProjectType[])
    const [applications, setApplications] = useState([] as ApplicationType[])
    const [projectsArchive, setProjectsArchive] = useState(archiveData? archiveData.projects: [])
    
    const [scene, setScene] = useState(Scene.Applicataions)

    useEffect(() => {
        switch (scene) {
            case Scene.Active: 
                getProjects({limit: 150, numberSkip: 0})
                break
            case Scene.Applicataions: 
                applicationsGet({limit: 150, numberSkip: 0})
        }
    }, [scene])

    const applicationsQuries = useSelector((state: any) => state.applications.queries)

    useEffect(() => {
        //типа запрос на измение карточек
    }, [applications])

    useEffect(() => {
        //типа запрос на измение карточек
        console.log(projects)
    }, [projects])

    useEffect(() => {
        //типа запрос на измение карточек
    }, [projectsArchive])
    
    useEffect(() => setApplications(applicationsData.data? applicationsData.data: []), [applicationsData])
    useEffect(() => setProjects(projectsData.data? projectsData.data: []), [projectsData])
    useEffect(() => setProjectsArchive(archiveData? archiveData.projects: []), [archiveData])
    
    dispatch(setShowFooter(false))

    const filterByCountLetters5 = () => setProjects(projects.filter(v => v.application.deviceType.name.length <= 5))

    const filterByZeroCards  = () => setProjects(projects.filter(v => 
        v.application.tests
            ? v.application.tests.length < 1
            : true
    ))
    
    const withoutFilters = () => setProjects(projectsData.data? projectsData.data: [])

    const search = (v: string) => projects
        ? v.length > 0
            ? setProjects(projects.filter(p => 
                p.application.deviceType.name.includes(v) ||
                p.application.applicant.company.includes(v) ||
                p.application.deviceModel.includes(v) ||
                p.application.applicant.address.includes(v) ||
                p.application.applicant.email.includes(v) ||
                p.application.applicant.firstName.includes(v) ||
                p.application.applicant.lastName.includes(v) ||
                p.application.applicant.position.includes(v)
            ))
            : setProjects(projectsData.data? projectsData.data: [])
        : undefined
    
    const searchArchive = (v: string) => archiveData
        ? v.length > 0
            ? setProjectsArchive(archiveData.projects.filter(p => p.typeName.includes(v)))
            : setProjectsArchive(archiveData.projects)
        : undefined

    const changeCards = (projectId: string, cards: TestGroup[]) => {        
        setProjects(ps => [...ps].map(p => p.guid !== projectId? p: {
            ...p,
            application: {
                ...p.application,
                tests: cards
            }
        }))
    }

    const changeCardsArchive = (projectId: string, cards: CardArchive[]) => {
        const projectArchive = {...projectsArchive.find(p => p.id === projectId)} as ProjectArchiveType

        if(projectArchive) projectArchive.cards = cards
        else return

        setProjectsArchive(projectsArchive.map(p => p.id !== projectArchive.id? p: projectArchive))
    }

    const onChangeStatusApplication = (status: ApplicationStatusResponse, id: string) => {
        if(status.name === "Preparation") setApplications(applications.filter(a => a.guid !== id))
        else setApplications(applications.map(a => a.guid === id
            ? {
                ...a,
                 currentStatus: {
                    name: status.name,
                    dateOfCreation: status.dateOfCreation,
                    internalLabel: status.internalLabel,
                    externalLabel: status.externalLabel,
                    message: status.message
                } as CurrentStatus
            } as ApplicationType
            : a
        ))
    }

    const save = (project: ProjectType) => {
        //setOpenAddApplication(false)

        const lProjects = [...projects]

        lProjects.filter(p => p.guid !== project.guid).unshift(project)

        setProjects(lProjects)
    }

    return (
        <>
            <div className={editingCard.guid? styles.mainBlur: styles.main}>
                <h1 className={styles.title}>Проведение испытании</h1>
                <>
                    <div className={styles.SearchAndFilter}>
                        <div className={styles.search}>
                            <Search callback={scene === Scene.Archive? searchArchive: search}/>
                        </div>
                        <div className={styles.filters}>
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
                    </div>
                    <div className={styles.sceneHeader}>
                        <div className={styles.buttons}>
                            {Object.values(Scene).map(s => 
                                <div key={s} onClick={() => setScene(s)} className={s === scene? styles.switchSelectedScene: styles.switchScene}>{s}</div>
                            )}
                        </div>
                    </div>

                </>
                <div className={styles.scene}>
                    <>
                        {applicationsData.data && scene === Scene.Applicataions && applications &&
                            <div className={styles.projects}>
                                {applications.map(a => 
                                    <div key={a.guid} className={styles.project}>
                                        <Application 
                                            id={a.guid}
                                            status={a.currentStatus}
                                            typeName={a.deviceType.name}      
                                            modelName={a.deviceModel}                                   
                                            testGroups={a.tests} 
                                            application={a}
                                            onChangeStatus={onChangeStatusApplication}
                                        />
                                    </div>
                                )}
                            </div>
                        }
                        {projectsData.data && scene === Scene.Active && projects &&
                            <div className={styles.projects}>
                                {projects.map(p => 
                                    <div key={p.guid} className={styles.project}>
                                        <Project 
                                            id={p.guid}
                                            dutRegistrationData={p.dutRegistrationData}
                                            status={p.application.currentStatus}
                                            modelName={p.application.deviceModel}
                                            changeCards={changeCards}
                                            typeName={p.application.deviceType.name}                                         
                                            testGroups={p.application.tests} 
                                            deadline={p.deadline} 
                                            executor={p.executor}
                                            application={p.application}
                                            setEditingCard={setEditingCard}
                                            save={save}
                                        />
                                    </div>
                                )}
                            </div>
                        }
                        {!archiveIsLoading && scene === Scene.Archive && projectsArchive &&
                            <div className={styles.archive}>
                                <div className={styles.projects}>
                                    {projectsArchive.filter(p => !p.isProcess).map(p => 
                                        <div key={p.id} className={styles.project}>
                                            <ProjectArchive 
                                                id={p.id}
                                                changeCards={changeCardsArchive}
                                                status={p.status}
                                                name={p.typeName}                                         
                                                cards={p.cards} 
                                                deadline={p.deadline} 
                                                producer={p.application}
                                                release={p.release}
                                                tester={p.tester}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        {applicationsData.isLoading && scene === Scene.Applicataions &&
                            <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                        }
                        {projectsData.isLoading && scene === Scene.Active &&
                            <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                        }
                        {archiveIsLoading && scene === Scene.Archive &&
                            <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                        }
                        {!applications && !applicationsData.isLoading && scene === Scene.Applicataions &&
                            <div className={styles.loading}>НЕТ ЗАЯВОК</div>
                        }
                        {!projects && !applicationsData.isLoading && scene === Scene.Active &&
                            <div className={styles.loading}>НЕТ АКТИВНЫХ ПРОЕКТОВ</div>
                        }
                        {!projectsArchive && !archiveIsLoading && scene === Scene.Archive &&
                            <div className={styles.loading}>НЕТ АРХИВНЫХ ДАННЫХ</div>
                        }
                    </>
                </div>
            </div>
        </>
    )
}