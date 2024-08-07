import { useState } from "react"
import styles from "./Footer.module.scss"

const FooterSlot = () => {

    return (
        <div>"Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®"</div>
    )
}

export const Footer = (props: {slot?: JSX.Element}) => {
    if(!props?.slot) props = {slot: <FooterSlot/>}

    return (
        <div className={styles.footer}>{props.slot}</div>
    )
}