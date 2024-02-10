import styles from "./EmployerListItemComponent.module.scss"

interface EmployerListItemComponentProps {
    id: string
    fullname: string
    accessRights: string
    storyActions: string
}

export const EmployerListItemComponent = (props: EmployerListItemComponentProps) => {
    return (
        <div className={styles.main}>
            <div className={`${styles.fullname} ${styles.item}`}>{props.fullname}</div>
            <div className={`${styles.accessRights} ${styles.item}`}>{props.accessRights}</div>
            <div className={`${styles.storyActions} ${styles.item}`}>{props.storyActions}</div>
        </div>
    )
}