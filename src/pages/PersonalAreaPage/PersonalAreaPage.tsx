import { ProfileComponent } from './components/ProfileComponent/ProfileComponent'
import styles from "./PersonalAreaPage.module.scss"
import logoMenu from "../../source/images/LogoMenuPersonalArea.png"
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '../../connect/authApi/Types'
import { useEffect } from 'react'


export const PersonalAreaPage = () => {
    const navigate = useNavigate() 

    const data = localStorage.getItem('lims.user') 

    useEffect(() => {
        if (!data) {
          navigate("/signin");
        }
    }, [navigate, data]);

    if(!data) return null
   
    const userinfo : UserInfo = JSON.parse(data)

    return (
        <div className={styles.main}>
            {data && 
                <div>
                    <div className={styles.menu}>
                        <img className={styles.logo} src={logoMenu} alt="logoMenu"/>
                        <ProfileComponent firstname={userinfo.firstname} lastname={userinfo.lastname}/>
                    </div>
                    <div className={styles.scene}></div>
                </div>
            }
        </div>
    )
}