import styles from './ProfileComponent.module.scss'
import profileLogo from '../../../../source/images/ProfileLogo.png'

interface ProfileComponentProps {
    firstname: string
    lastname: string
}

export const ProfileComponent = (props: ProfileComponentProps) => {   

    console.log(props.firstname)
    return (
        <div className={styles.main}>
            <img className={styles.logo} src={profileLogo} alt="profileLogo" />
            <div className={styles.profileTitle}>{props.firstname + " " + props.lastname}</div>
        </div>
    )
}