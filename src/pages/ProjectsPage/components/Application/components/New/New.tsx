import { useRef, useState } from "react"

import { Application,TestGroup, Test } from "../../../../../../connect/applicationsApi/Types"

import styles from "./New.module.scss"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsNew {
    id: string
    typeName: string
    modelName: string
    application: Application
    status: string
    testGroups: TestGroup[]
    onChangeStatus: (status: string, comment: string) => void
}

export const New = (props: propsNew) => {
    const [isOpenReject, setIsOpenReject] = useState(false)
    const [isOpenFix, setIsOpenFix] = useState(false)
    const [isOpenAccept, setIsOpenAccept] = useState(false)
//UnderImprovement
//Preparation
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
                    <div onClick={() => setIsOpenFix(true)} className={styles.fix}>Отправить на доработку</div>
                    <div onClick={() => setIsOpenAccept(true)} className={styles.accept}>Принять в работу</div>
                </div>
            </div>
            {isOpenAccept &&
                <div className={styles.accept}>
                    <div className={styles.title}>Принятие заявки</div>
                    <div className={styles.description}>
                        Заявка будет перемещена во вкладку Активные проекты и переведена в статус Согласование документов.
                        Заявитель получит уведомление о том, что его заявка принята.
                    </div>
                    <input onChange={e => comment.current = e.target.value} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <div onClick={() => setIsOpenAccept(false)} className={styles.reject}>Отменить</div>
                        <div onClick={() => props.onChangeStatus("Preparation", comment.current)} className={styles.accept}>Отправить</div>
                    </div>
                </div>
            }
            {isOpenFix &&
                <div className={styles.fix}>
                    <div className={styles.title}>Отправка на доработку</div>
                    <div className={styles.description}>
                        Заявка будет возвращена заявителю с возможностью редактирования. 
                        Пожалуйста, опишите требования по доработке заявки - они будут видны заявителю.
                    </div>
                    <input onChange={e => comment.current = e.target.value} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <div onClick={() => setIsOpenFix(false)} className={styles.reject}>Отменить</div>
                        <div onClick={() => props.onChangeStatus("UnderImprovement", comment.current)} className={styles.accept}>Отправить</div>
                    </div>
                </div>
            }
            {isOpenReject &&
                <div className={styles.reject}>
                    <div className={styles.title}>Отклонение заявки</div>
                    <div className={styles.description}>
                        Заявка будет отклонена и возвращена заявителю без возможности восстановления. 
                        Пожалуйста, укажите причину отклонения заявки - она будет видна заявителю.
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