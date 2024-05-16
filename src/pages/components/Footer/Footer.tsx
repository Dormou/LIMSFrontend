import styles from "./Footer.module.scss"

const footerSlot = () => {

    return (
        <div>"Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®"</div>
    )
}

export const Footer = (props: {slot?: JSX.Element}) => {
    if(!props?.slot) props = {slot: footerSlot()}

    return (
        <div className={styles.footer}>{props.slot}</div>
    )
}