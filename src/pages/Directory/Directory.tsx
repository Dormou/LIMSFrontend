import { useState } from 'react'
import { Search } from '../components/Search/Search'
import styles from './Directory.module.scss'

export const Directory = () => {
    const [isOpenDocs, setIsOpenDocs] = useState()
    const [isOpenDevices, setIsOpenDevices] = useState()

    const search = (v: string) => v

    return (
        <div className={styles.main}>
            <div className={styles.title}></div>
            <Search callback={search}/>
            <div className={styles.docs}>
                <div className={styles.title}>Нормативно-справочная информация</div>
                {isOpenDocs &&
                    <div className={styles.menu}>
                        <div className={styles.normative}>Нормативная документация</div>
                        <div className={styles.test}>Тесты</div>
                    </div>
                }
            </div>
            <div className={styles.devices}>
                <div className={styles.title}>Нормативно-справочная информация</div>
            </div>
        </div>
    )
}