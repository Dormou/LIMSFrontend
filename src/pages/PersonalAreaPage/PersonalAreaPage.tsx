import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'
import styles from "./PersonalAreaPage.module.scss"
import logoMenu from "../../source/images/LogoMenuPersonalArea.png"
import { Link, useNavigate } from 'react-router-dom'
import { UserInfo } from '../../connect/authApi/Types'
import { useEffect, useState } from 'react'
import { ListEmployersComponent } from './components/ListEmployersComponent/ListEmployersComponent'
import { TimeManageComponent } from './components/TimeManageComponent/TimeManageComponent'

export const PersonalAreaPage = () => {
    const [sceneName, setSceneName] = useState("Список сотрудников")

    const navigate = useNavigate() 

    const data = localStorage.getItem('lims.user') 

    useEffect(() => { 
        if (!data) navigate("/signin") 

    }, [navigate, data]);

    if(!data) return null
   
    const userinfo : UserInfo = JSON.parse(data)

    const scenes = new Map<string,  JSX.Element>([
        ["Список сотрудников", <ListEmployersComponent/>],
        ["Учет рабочего времени", <TimeManageComponent/>]
    ])

    const SetSelect = (title: string) => {
        if(title === sceneName) return "select"
        
        return "unselect"
    }

    return (
        <div className={styles.main}>
            {data && 
                <div>
                    <div className={styles.menu}>
                        <img className={styles.logo} src={logoMenu} alt="logoMenu"/>
                        <ProfileComponent firstname={userinfo.firstname} lastname={userinfo.lastname}/>
                    </div>
                    <div className={styles.scene}>
                        <div className={styles.sceneHeader}>
                            <div className={styles.sceneSwitcher}>
                                <div className={styles.switchButtonsConteinerScene}>
                                    {Array.from(scenes.keys()).map((title, i) => {
                                        return (
                                            <div 
                                                id={SetSelect(title)}
                                                key={title} 
                                                className={styles.switchButtonScene}
                                                onClick={() => setSceneName(title)}
                                            >
                                                {title}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <Link to={"/main"} className={styles.goToMainPage}>Вернуться на главную страницу</Link>
                        </div>
                        <div className={styles.sceneBody}>
                            {scenes.get(sceneName)}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}