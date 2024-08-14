import { useRef, useState } from "react"

import { Application,TestGroup, Test } from "../../../../../../connect/projectsApi/Types"

import styles from "./AwaitDevice.module.scss"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsAwaitDevice {
    id: string
    typeName: string
    modelName: string
    application: Application
    status: string
    testGroups: TestGroup[]
    onChangeStatus: (status: string, comment: string) => void
}

export const AwaitDevice = (props: propsAwaitDevice) => {
    const [isOpenReject, setIsOpenReject] = useState(false)
    const [disabledDUT, setDisabledDUT] = useState(true)

    const dut = useRef("")

    const decorator = (callback: () => void) => {
        callback()

        if(dut.current.length > 0) setDisabledDUT(false)
        else setDisabledDUT(true)
    }

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
            <div className={styles.footerConteiner}>
                <div className={styles.footer}>
                    <input 
                        onChange={e => decorator(() => dut.current = e.target.value)} 
                        className={styles.dut}
                        placeholder={"Регистрационные данные образца устройства..."}
                    >

                    </input>
                    <button 
                        disabled={dut.current.length <= 0} 
                        onClick={() => {
                            props.onChangeStatus("InProgress", dut.current)
                            window.location.reload();
                        }} 
                        className={styles.accept}
                    >
                    Образец получен</button>
                </div>
            </div>
        </div>
    )
}