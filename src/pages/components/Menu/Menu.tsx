import { useState } from "react"

import labIcon from '../../../source/images/icons/ant-design_experiment-outlined.svg'
import bookIcon from '../../../source/images/icons/ant-design_book-outlined.svg'
import empsIcon from '../../../source/images/icons/ant-design_team-outlined.svg'
import tradeMark from '../../../source/images/icons/ant-design_trademark-circle-outlined.svg'

import styles from './Menu.module.scss'
import { Link } from "react-router-dom"

interface propsMenu {
    isOpenMenu: boolean
    setIsOpenMenu: (value: boolean) => void
}

export const Menu = (props: propsMenu) => {
    return(
        <div onMouseEnter={() => props.setIsOpenMenu(true)} className={props.isOpenMenu? styles.menuOpen: styles.menu}>
            <div className={styles.buttons}>
                <div className={styles.labIcon}>
                    <Link to={'/projects'}>
                        <img src={labIcon} alt={'labIcon'}/>
                        {props.isOpenMenu && <h3>Испытания</h3>}
                    </Link>
                </div>
                <div className={styles.bookIcon}>
                    <Link to={'/directory'}>
                        <img src={bookIcon} alt={'bookIcon'}/>
                        {props.isOpenMenu && <h3>Справочник</h3>}
                    </Link>
                </div>
                <div className={styles.empsIcon}>
                    <Link to={'/directory'}>
                        <img src={empsIcon} alt={'empsIcon'}/>
                        {props.isOpenMenu && <h3>Сотрудники</h3>}
                    </Link>
                </div>
            </div>
            {!props.isOpenMenu &&
                <div className={styles.tradeMark}>
                    <img src={tradeMark} alt={'tradeMark'}/>
                </div>
            }
        </div>
    )
}