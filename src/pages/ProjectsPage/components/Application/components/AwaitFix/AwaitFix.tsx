import { useRef, useState } from "react"

import { Application,TestGroup, Test } from "../../../../../../connect/applicationsApi/Types"

import styles from "./AwaitFix.module.scss"
import { EditApplicationForm } from "./components/EditApplicationForm/EditApplicationForm"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsAwaitFix {
    id: string
    typeName: string
    modelName: string
    deviceTypeId: string
    application: Application
    status: string
    testGroups: TestGroup[]
    statusMessage: string
    onChangeStatus: (status: string, comment: string) => void
    save: (application: Application) => void
}

export const AwaitFix = (props: propsAwaitFix) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const comment = useRef("")

    return (
        <div className={styles.main}>
            <div className={styles.application}>
                <div className={styles.testGroupsContainer}>
                    <div className={styles.title}>Оборудование для проведения испытаний:</div>
                    <div className={styles.testGroups}>
                        {props.testGroups.map(tg => 
                            <div key={tg.equipmentGuid} className={styles.testGroup}>
                                <div className={styles.name}>{tg.equipmentName}</div>
                                <div className={styles.tests}>
                                    {tg.tests?.map(t => 
                                        <div key={t.guid} className={styles.test}>
                                            <div className={styles.title}>{t.name}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.comment}>
                    <div className={styles.application}>
                        <div className={styles.title}>Комментарии к заявке:</div>
                        <div className={styles.value}>{props.application.comment}</div>
                    </div>
                    <div className={styles.files}>
                        <div className={styles.title}>Прикреплённые файлы:</div>
                        <div className={styles.value}>Файлов нет</div>
                    </div>
                    <div className={styles.reject}>
                        <div className={styles.title}>Комментарии к доработке:</div>
                        <div className={styles.value}>{props.statusMessage}</div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsConteiner}>
                <div className={styles.buttons}>
                    <div onClick={() => setIsOpenEdit(true)} className={styles.reject}>Редактировать заявку</div>
                </div>
            </div>
            {isOpenEdit &&
                <EditApplicationForm 
                    testsGroups={props.testGroups}
                    deviceModel={props.application.deviceModel}
                    applicationGuid={props.id}
                    deviceTypeId={props.deviceTypeId} 
                    comment={props.application.comment}   
                    close={() => setIsOpenEdit(false)}
                    save={props.save}              
                />
            }
        </div>
    )
}