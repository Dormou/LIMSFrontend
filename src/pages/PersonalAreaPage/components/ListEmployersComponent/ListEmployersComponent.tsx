import { fetchAccounts } from "../../../../mock/authApiMock"
import styles from "./ListEmployersComponent.module.scss"
import { EmployerListItemComponent } from "./components/EmployerListItemComponent/EmployerListItemComponent"
import filterIconFilter from "../../../../source/images/icons/filter-icon-personal-area-filter.png"
import filterIconCalendar from "../../../../source/images/icons/calendar-icon-personal-area-filter.png"
import { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'

export const ListEmployersComponent = () => {
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const accounts = fetchAccounts()

    return (
        <div className={styles.main}>
            <div className={styles.accounts}>
                <input 
                    className={styles.search} 
                    type="search" 
                    id="emp-search" 
                    name="q" 
                    placeholder="Поиск по ФИО"
                />
                <div className={styles.filter}>
                    <div className={styles.fullname}>ФИО</div>
                    <div className={styles.accessRights}>Права доступа
                        <img 
                            className={styles.filterIcon} 
                            src={filterIconFilter} 
                            alt="filterIcon"
                        />
                    </div>
                    <div className={styles.storyActions}>История действии
                        <img                        
                            onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                            className={styles.filterIcon} 
                            src={filterIconCalendar} 
                            alt="filterIcon"
                        />
                    </div>
                </div>
                {accounts.map(account => {
                    return (
                        <div className={styles.account}>
                            <EmployerListItemComponent 
                                id={account.id}
                                fullname={account.fullname}
                                accessRights={account.accessRights}
                                storyActions={account.storyActions}
                            />
                        </div>
                    )
                })}
            </div>
            {isOpenCalendar && <Calendar className={styles.calendar}/>}
        </div>
    )
}