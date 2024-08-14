import { ReactElement } from "react"
import styles from "./ModalWindow.module.scss"

interface propsModalWindow { 
    slot?: ReactElement 
    styles?: string;
}

export const ModalWindow = (props: propsModalWindow) => <div className={styles.main}>{props.slot? props.slot: <div>NO CONTENT</div>}</div>