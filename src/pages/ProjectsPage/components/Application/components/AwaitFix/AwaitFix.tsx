import { useRef } from "react"

import { Application,TestGroup, Test } from "../../../../../../connect/applicationsApi/Types"

import styles from "./AwaitFix.module.scss"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsAwaitFix {
    id: string
    typeName: string
    modelName: string
    application: Application
    status: string
    statusMessage: string
    testGroups: TestGroup[]
}

export const AwaitFix = (props: propsAwaitFix) => {

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
                <div className={styles.comments}>
                    <div className={styles.comment}>
                        <div className={styles.title}>Комментарии к заявке:</div>
                        <div className={styles.text}>{props.application.comment}</div>
                        <div className={styles.title}>Прикреплённые файлы:</div>
                        <div className={styles.files}>Файлов нет</div>
                    </div>
                    <div className={styles.commentForCustomer}>
                        <div className={styles.title}>Комментарии для заявителя:</div>
                        <div className={styles.text}>{props.statusMessage}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}