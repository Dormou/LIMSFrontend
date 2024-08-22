import { useState } from 'react'

import { Application, TestGroup as CardType, Executor, CurrentStatus, Test, Project as ProjectType} from '../../../../connect/projectsApi/Types'

import actionsIcon from '../../../../source/images/icons/actions.svg'
import hideButtonIcon from '../../../../source/images/icons/hide-button.svg'

import styles from './Project.module.scss'
import { InWork } from './components/InWork/InWork'
import { Agreement } from './components/Agreement/Agreement'
import { AwaitAgreementCustomer } from './components/AwaitAgreementCustomer/AwaitAgreementCustomer'
import { Done } from './components/Done/Done'
import { AwaitDevice } from './components/AwaitDevice/AwaitDevice'
import { useLazyGetCurrentStatusQuery } from '../../../../connect/applicationsApi/applicationsApi'
import { useChangeCurrentStatusMutation } from '../../../../connect/projectsApi/projectsApi'

interface propsProject {
    id: string
    typeName: string
    modelName: string
    dutRegistrationData: string
    executor: Executor
    application: Application
    deadline: Date
    status: CurrentStatus
    testGroups: CardType[]
    changeCards: (id: string, cards: CardType[]) => void
    setEditingCard: (data: Test) => void
    save: (project: ProjectType) => void
    //onChangeStatus: (status: string, guid: string) => void
}


export const Project = (props: propsProject) => {
    const [hide, setHide] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)

    const [changeStatusProject] = useChangeCurrentStatusMutation()

    const getStyleBorder = (internalLabel: string) => {
        switch(internalLabel) {
            case "В работе": return styles.inWorkBorder
            
            case "Ожидание образца устройства": return styles.awaitObjectDevice

            case "Согласование": return styles.agreement

            case "Отправлено на согласование": return styles.sendCustomerAgreement

            case "Завершено": return styles.done
            
            default: return ''
        }
    }
    
    const onChangeStatus = async (status: string, comment: string) => {
        console.log(comment)
        const res: any = await changeStatusProject({
            projectGuid: props.id,
            statusDescriptionName: status,
            message: comment
        })
    }

    return (
        <div className={`${styles.main} ${getStyleBorder(props.status.internalLabel)}`}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.typeName}>Устройство: {props.typeName}&nbsp;</div>
                    <div className={styles.modelName}>Модель: {props.modelName}</div>
                    <div className={styles.status}>Статус: {props.status.internalLabel}</div>
                    <button onClick={() => setHide(!hide)} className={hide? styles.hideButtonActive: styles.hideButton}>
                        <img src={hideButtonIcon} className={styles.hideButton} alt={'hideButton'}/>
                    </button>
                    <button onClick={() => setOpenMenu(!openMenu)} className={styles.actionsButton}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </button>
                    {openMenu &&
                        <div className={styles.actions}>
                            <div className={styles.action}>Редактировать</div>
                            <div className={styles.action}>Открыть отчет</div>
                            <div className={styles.action}>Архивировать</div>
                            <div className={styles.action}>Удалить</div>
                        </div>
                    }
                </div>
                <div className={styles.description}>
                    <div className={styles.producer}>
                        <div  className={styles.element}>
                            <div className={styles.title}>Заявитель:</div>
                            <div className={styles.urInfo}>{props.application.applicant.company}</div>
                            <div className={styles.borndotTitle}>Дата подачи заявки</div>
                            &nbsp;<div className={styles.borndot}>{props.application.applicant.dateOfCreation}</div>
                        </div>
                        {props.status.internalLabel === "В работе" &&
                            <div  className={styles.element}>
                                <div className={styles.title}>Отвественный исполнитель:</div>
                                <div className={styles.urInfo}>{props.executor.firstName}&nbsp;{props.executor.lastName}</div>
                                <div className={styles.deadlineTitle}>Срок завершения</div>
                                &nbsp;<div className={styles.deadline}>{props.deadline.toLocaleString()}</div>
                            </div>
                        }
                        <div  className={styles.element}>
                        <div className={styles.title}>Регистрационные данные образца устройства:</div>
                            <div className={styles.dutRegistrationData}>идентификатор или ссылка на внутренний репозиторий</div>
                        </div>
                        <div  className={styles.element}>
                            <div className={styles.title}>Контактные данные:</div>
                            <div className={styles.contact}>
                                {props.application.applicant.email}
                                &nbsp;{props.application.applicant.phoneNumber}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                    {!hide && 
                        <>
                            {props.status.internalLabel === "В работе" &&
                                <InWork 
                                    id={props.id}
                                    typeName={props.typeName}
                                    modelName={props.modelName}
                                    executor={props.executor}
                                    deadline={props.deadline}
                                    status={props.status.internalLabel}
                                    dutRegistrationData={props.dutRegistrationData}
                                    testGroups={props.testGroups}
                                    producer={props.application}
                                    changeCards={props.changeCards}
                                    setEditingCard={props.setEditingCard}
                                />
                            }

                            {props.status.internalLabel === "Ожидание образца устройства" &&
                                <AwaitDevice 
                                    id={props.id}
                                    typeName={props.typeName}
                                    modelName={props.modelName}
                                    status={props.status.internalLabel}
                                    testGroups={props.testGroups}
                                    application={props.application}
                                    onChangeStatus={onChangeStatus}
                                />
                            }

                            {props.status.internalLabel === "Согласование" && 
                                <Agreement
                                    projectId={props.id}
                                    save={props.save}
                                    dutRegistrationData={props.dutRegistrationData}
                                    testGroups={props.testGroups}
                                />
                            }

                            {props.status.internalLabel === "Отправлено на согласование" && 
                                <AwaitAgreementCustomer
                                    projectId={props.id}
                                    dutRegistrationData={props.dutRegistrationData}
                                    testGroups={props.testGroups}
                                    executor={props.executor}
                                    deadline={props.deadline}
                                />
                            }

                            {props.status.internalLabel === "Завершено" && 
                                <Done
                                    projectId={props.id}
                                    dutRegistrationData={props.dutRegistrationData}
                                    testGroups={props.testGroups}
                                    executor={props.executor}
                                    deadline={props.deadline}
                                />
                            }
                        </>
                    }
                </div>
    )
}