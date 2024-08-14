import { useRef, useState } from "react"

import { Application,TestGroup, Test } from "../../../../../../connect/applicationsApi/Types"

import styles from "./AwaitAgreementCustomer.module.scss"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsAwaitAgreementCustomer {
    id: string
    typeName: string
    modelName: string
    application: Application
    status: string
    testGroups: TestGroup[]
    onChangeStatus: (status: string, comment: string) => void
}

export const AwaitAgreementCustomer = (props: propsAwaitAgreementCustomer) => {
    const [isOpenReject, setIsOpenReject] = useState(false)
    //const [isOpenAccept, setIsOpenAccept] = useState(false)

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
                    <div className={styles.title}>Комментарии к заявке:</div>
                    <div className={styles.text}>{props.application.comment}</div>
                    <div className={styles.title}>Прикреплённые файлы:</div>
                    <div className={styles.files}>Файлов нет</div>
                </div>
            </div>
            <div className={styles.buttonsConteiner}>
                <div className={styles.buttons}>
                    <div onClick={() => setIsOpenReject(true)} className={styles.reject}>Отклонить</div>
                    <div onClick={() => props.onChangeStatus("Waiting", comment.current)} className={styles.accept}>Согласовать</div>
                </div>
            </div>
            {/* {isOpenAccept &&
                <div className={styles.accept}>
                    <div className={styles.title}>Принятие заявки</div>
                    <div className={styles.description}>
                        Заявка будет перемещена во вкладку Активные проекты и переведена в статус Согласование документов.
                        Заявитель получит уведомление о том, что его заявка принята.
                    </div>
                    <input onChange={e => comment.current = e.target.value} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <div onClick={() => setIsOpenAccept(false)} className={styles.reject}>Отменить</div>
                        <div onClick={() => props.onChangeStatus("InProgress", comment.current)} className={styles.accept}>Отправить</div>
                    </div>
                </div>
            } */}
            {isOpenReject &&
                <div className={styles.reject}>
                    <div className={styles.title}>Отклонение заявки</div>
                    <div className={styles.description}>
                        Пожалуйста, опишите причину отклонения документов - ваш комментарий будет виден исполнителю.
                    </div>
                    <input onChange={e => comment.current = e.target.value} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <div onClick={() => setIsOpenReject(false)} className={styles.reject}>Отменить</div>
                        <div onClick={() => props.onChangeStatus("Rejected", comment.current)} className={styles.accept}>Отклонить</div>
                    </div>
                </div>
            }
        </div>
    )
}