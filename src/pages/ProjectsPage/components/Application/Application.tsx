import { useEffect, useState } from 'react'

import { TestGroup as CardType, CurrentStatus } from '../../../../connect/applicationsApi/Types'

import actionsIcon from '../../../../source/images/icons/actions.svg'
import hideButtonIcon from '../../../../source/images/icons/hide-button.svg'

import styles from './Application.module.scss'
import { New } from './components/New/New'
import { AwaitFix } from './components/AwaitFix/AwaitFix'
import { Application as ApplicationType } from '../../../../connect/applicationsApi/Types'
import { useChangeCurrentStatusMutation, useGetCurrentStatusQuery, useLazyGetCurrentStatusQuery } from '../../../../connect/applicationsApi/applicationsApi'
import { ApplicationStatusResponse } from '../../../../connect/applicationsApi/Responses'
import { Reject } from './components/Reject/Reject'
import { Agreement } from './components/Agreement/Agreement'
import { InWork } from './components/InWork/InWork'
import { AwaitAgreementCustomer } from './components/AwaitAgreementCustomer/AwaitAgreementCustomer'
import { Done } from './components/Done/Done'

interface propsApplication {
    id: string
    typeName: string
    modelName: string
    application: ApplicationType
    status: CurrentStatus
    testGroups: CardType[]
    onChangeStatus: (status: ApplicationStatusResponse, id: string) => void
}


export const Application = (props: propsApplication) => {
    const [hide, setHide] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)

    const [getStatus] = useLazyGetCurrentStatusQuery()
    const [changeStatus] = useChangeCurrentStatusMutation()

    const onChangeStatus = async (status: string, comment: string) => {
        console.log(comment)
        const res: any = await changeStatus({
            projectGuid: props.application.guid,
            statusDescriptionName: status,
            message: comment
        })

        if(!res.error) {
            await getStatus(props.application.guid)
                .unwrap()
                .then((r) => props.onChangeStatus(r, props.application.guid))

            //props.onChangeStatus(props.application.guid)
        }
        else {

        }
    }

    const getStyleBorder = (internalLabel: string) => {
        switch(internalLabel) {
            case "Новая": return styles.newBorder

            case "В работе": return styles.inWorkBorder

            case "Отказано": return styles.reject

            case "Отправлена на доработку": return styles.awaitFix
            
            case "Ожидание образца устройства": return styles.awaitObjectDevice

            case "Согласование": return styles.agreement
            
            case "Завершено": return styles.done
            
            default: return ''
        }
    }
    
    return (
        <div className={`${styles.main} ${getStyleBorder(props.application.currentStatus.internalLabel)}`}>
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
                            <div className={styles.urInfo}>{props.application.applicant.company}&nbsp;{props.application.applicant.address}</div>
                            <div className={styles.borndotTitle}>Дата подачи заявки</div>
                            &nbsp;<div className={styles.borndot}>{props.application.applicant.dateOfCreation}</div>
                        </div>
                        <div  className={styles.element}>
                       <div className={styles.title}>ФИО:</div>
                            <div className={styles.fio}>
                                {props.application.applicant.firstName}
                                &nbsp;{props.application.applicant.lastName}
                                &nbsp;{props.application.applicant.secondName}
                                &nbsp;({props.application.applicant.position})
                            </div>
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
                    {props.status.internalLabel === "Новая" &&
                        <New 
                            id={props.id}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            status={props.status.internalLabel}
                            testGroups={props.testGroups}
                            application={props.application}
                            onChangeStatus={onChangeStatus}
                        />
                    }

                    {props.status.internalLabel === "Отправлена на доработку" && 
                        <AwaitFix
                            id={props.id}
                            statusMessage={props.status.message}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            status={props.status.internalLabel}
                            testGroups={props.testGroups}
                            application={props.application}
                        />
                    }

                    {props.status.internalLabel === "В работе" && 
                        <InWork
                            id={props.id}
                            statusMessage={props.status.message}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            status={props.status.internalLabel}
                            testGroups={props.testGroups}
                            application={props.application}
                        />
                    }

                    {props.status.internalLabel === "Отправлено на согласование" && 
                        <AwaitAgreementCustomer
                            projectId={props.id}
                            testGroups={props.testGroups}
                        />
                    }

                    {props.status.internalLabel === "Отказано" &&
                        <Reject
                            id={props.id}
                            statusMessage={props.status.message}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            status={props.status.internalLabel}
                            testGroups={props.testGroups}
                            application={props.application}
                        />
                    }

                    {props.status.internalLabel === "Согласование" &&
                        <Agreement
                            id={props.id}
                            statusMessage={props.status.message}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            status={props.status.internalLabel}
                            testGroups={props.testGroups}
                            application={props.application}
                        />
                    }

                    {props.status.internalLabel === "Завершено" && 
                        <Done
                            projectId={props.id}
                            testGroups={props.testGroups}
                        />
                    }
                </>
            }
        </div>
    )
}