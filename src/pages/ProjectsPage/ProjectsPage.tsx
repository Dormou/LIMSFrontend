import { useEffect, useRef, useState } from "react"

import styles from './ProjectsPage.module.scss'
import { Search } from "../components/Search/Search"
import { Filter } from "../components/Filter/Filter"
import { useFetchProjectsArchiveQuery } from "../../connect/projectsApi/projectsApi"
import ReactLoading from "react-loading"
import { useDispatch, useSelector } from "react-redux"
import { setShowFooter } from "../../connect/store"
import { ProjectArchive } from "./components/ProjectArchive/ProjectArchive"
import { CardArchive, ProjectArchive as ProjectArchiveType, Test, CurrentStatus } from "../../connect/projectsApi/Types"
import { Application as ApplicationType, TestGroup} from "../../connect/applicationsApi/Types"
import { Application } from "./components/Application/Application"
import { useLazyFetchApplicationsQuery } from "../../connect/applicationsApi/applicationsApi"
import { ApplicationStatusResponse } from "../../connect/applicationsApi/Responses"
import { AddApplicationForm } from "./components/Application/components/AddApplicationForm/AddApplicationForm"
import { useFetchTestDescriptionsQuery, useFetchTestGroupDescriptionsQuery } from "../../connect/testDescriptionApi/testDescriptionApi"

enum Scene {
    Applicataions = 'Заявки',
    Archive = 'Архив',
}

export const ProjectsPage = () => {
    const dispatch = useDispatch()

    const [applicationsGet, applicationsData] = useLazyFetchApplicationsQuery()

    const {isLoading: isLoadingTestDescs, data: dataTestsDescs} = useFetchTestGroupDescriptionsQuery({numberSkip: 0, limit: 300})
    const {isLoading: archiveIsLoading, data: archiveData} = useFetchProjectsArchiveQuery({offset: 0, size: 20})
    
    const [editingCard, setEditingCard] = useState({} as Test)
    const [applications, setApplications] = useState([] as ApplicationType[])
    const [projectsArchive, setProjectsArchive] = useState(archiveData? archiveData.projects: [])
    const [openAddApplication, setOpenAddApplication] = useState(false)
    
    const [scene, setScene] = useState(Scene.Applicataions)

    useEffect(() => {
        switch (scene) {
            case Scene.Applicataions: 
                applicationsGet({limit: 20, numberSkip: 0})
        }
    }, [scene])

    const applicationsQuries = useSelector((state: any) => state.applications.queries)
    
    useEffect(() => setApplications(applicationsData.data? applicationsData.data: []), [applicationsData])
    useEffect(() => setProjectsArchive(archiveData? archiveData.projects: []), [archiveData])
    
    dispatch(setShowFooter(false))

    const filterByCountLetters5 = () => setApplications(applications.filter(v => v.deviceType.name.length <= 5))

    const filterByZeroCards  = () => setApplications(applications.filter(v => 
        v.tests
            ? v.tests.length < 1
            : true
    ))
    
    const withoutFilters = () => setApplications(applicationsData.data? applicationsData.data: [])

    const search = (v: string) => applications
        ? v.length > 0 && applicationsData.data
            ? setApplications(applicationsData.data.filter(a => 
                a.deviceType.name.includes(v) ||
                a.applicant.company.includes(v) ||
                a.deviceModel.includes(v) ||
                a.applicant.address.includes(v) ||
                a.applicant.email.includes(v) ||
                a.applicant.firstName.includes(v) ||
                a.applicant.lastName.includes(v) ||
                //a.comment? a.comment.includes(v): true ||
                a.tests.find(t => t.equipmentName.includes(v)) ||
                a.applicant.position.includes(v)
            ))
            : setApplications(applicationsData.data? applicationsData.data: [])
        : undefined
    
    const searchArchive = (v: string) => archiveData
        ? v.length > 0
            ? setProjectsArchive(archiveData.projects.filter(p => p.typeName.includes(v)))
            : setProjectsArchive(archiveData.projects)
        : undefined

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

    const saveAppliction = (application: ApplicationType) => {
        setOpenAddApplication(false)

        const lApplications = [...applications]

        lApplications.filter(p => p.guid !== application.guid).unshift(application)

        setApplications(lApplications)
    }

    return (
        <>
            {openAddApplication && !isLoadingTestDescs && dataTestsDescs &&
                <AddApplicationForm 
                    testsGroups={dataTestsDescs}
                    // testsGroups={applications.map(a => a.tests).flat().reduce((o: TestGroup[], i) => {
                    //     if (!o.find(v => v.equipmentGuid === i.equipmentGuid)) {
                    //         o.push(i)
                    //     }
                    //     return o
                    // }, [])}
                    applicantGuid={"eea88f9f-b570-49d3-9765-062401391cb1"}//FIX
                    close={() => setOpenAddApplication(false)}
                    save={saveAppliction}
                />
            }
            <div className={editingCard.guid? styles.mainBlur: styles.main}>
                <h1 className={styles.title}>Проведение испытании</h1>
                <>
                    <div className={styles.SearchAndFilter}>
                        <button disabled={isLoadingTestDescs} onClick={() => setOpenAddApplication(true)} className={styles.openAddApplication}>Добавить заявку</button>
                        <div className={styles.search}>
                            <Search callback={scene === Scene.Archive? searchArchive: search}/>
                        </div>
                        <div className={styles.filters}>
                            <Filter 
                                filterAfterSelected={true}
                                items={applications}
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
                                            save={saveAppliction}
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
                        {archiveIsLoading && scene === Scene.Archive &&
                            <ReactLoading className={styles.loading} type={'spinningBubbles'} color={'#005B9C'} height={256} width={256} />
                        }
                        {!applications && !applicationsData.isLoading && scene === Scene.Applicataions &&
                            <div className={styles.loading}>НЕТ ЗАЯВОК</div>
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