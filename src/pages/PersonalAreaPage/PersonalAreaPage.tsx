import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import { UserInfo } from '../../connect/authApi/Types'

import { ListEmployersComponent } from './components/ListEmployersComponent/ListEmployersComponent'
import { TimeManageComponent } from './components/TimeManageComponent/TimeManageComponent'

import headerLogo from '../../source/images/logos/header-pa-logo.png'
import profileIcon from '../../source/images/icons/ant-design_user-outlined.svg'
import notificationIcon from '../../source/images/icons/notification-icon.svg'
import labIcon from '../../source/images/icons/ant-design_experiment-outlined.svg'
import bookIcon from '../../source/images/icons/ant-design_book-outlined.svg'
import empsIcon from '../../source/images/icons/ant-design_team-outlined.svg'
import tradeMark from '../../source/images/icons/ant-design_trademark-circle-outlined.svg'
import uploadIcon from '../../source/images/icons/upload-icon.svg'

import styles from "./PersonalAreaPage.module.scss"
import { DropdownMenu, DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { getUser } from '../../mock/authApiMock'
import { Input } from '../components/Input/Input'

type DropdownProfileHeader = {
    id: number
    value: string
    action: () => void
}

export const PersonalAreaPage = () => {
    const navigate = useNavigate() 

    const data = localStorage.getItem('lims.user') 
    const userinfo = getUser()//{token: "sdadasdsadasdas", firstname: "Ivan", lastname: "Vovanov", additionalname: 'Turkipatetov',email: "vovka@mail.ru"}//JSON.parse({data})
    
    //if(!data) return null
    //const userinfo : UserInfo = JSON.parse({data})

    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isChangingUserInfo, setIsChangingUserInfo] = useState(false)

    const firstname = useRef('')
    const lastname = useRef('')
    const additionalname = useRef('')
    const dolgnost = useRef('')
    const email = useRef('')
    const phone = useRef('')

    // useEffect(() => !isChangingUserInfo
    // //&& (firstname.current !== userinfo.firstname 
    // || lastname.current !== userinfo.lastname
    // || additionalname.current !== userinfo.additionalname
    // || dolgnost.current !== userinfo.dolgnost 
    // || email.current !== userinfo.email
    // || phone.current !== userinfo.phone//)
    //     ? console.log(true)
    //     : console.log(false), 
    //     [firstname, lastname, additionalname, dolgnost, email, phone]
    // )

    const onWriteUserInfo = (action?: () => void) => {
        if(action) action()

        firstname.current
        || lastname.current
        || additionalname.current
        || dolgnost.current
        || email.current
        || phone.current
            ? setIsChangingUserInfo(true)
            :setIsChangingUserInfo(false)    
    }

    useEffect(() => {
        console.log(lastname.current)
    }, [lastname.current])

    useEffect(() => { 
        //if (!data) navigate("/signin") 

    }, [navigate, data]);

    const onChangingPassword = (password: string) => {

    }

    const clearLabelsUserInfo = () => {
        firstname.current = ''
        lastname.current = ''
        additionalname.current = ''
        dolgnost.current = ''
        email.current = ''
        phone.current = ''
    }


    return (
        <div className={styles.main}>
            {/* {!data && 
                
            } */}
            <div>
                <div className={styles.header}>
                    <img className={styles.headerLogo} src={headerLogo} alt="headerLogo"/>
                    <h3 className={styles.headerText}>АИС Управление ИЛЦС</h3>
                    <div className={styles.profileHeader}>
                        <div className={styles.notifications}>
                            <img src={notificationIcon} alt='notificationIcon'/>
                        </div>
                        <div className={styles.profileIcon}>
                            <img src={profileIcon} alt='profileIcon'></img>
                        </div>
                        <div className={styles.profileDropdown}>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={styles.dropdownMenuTrigger}>
                                    <div className={styles.dropdownMenuText}>{userinfo.firstname}&nbsp;{userinfo.lastname}</div>
                                    <div className={styles.dropdownMenuIcon}></div>
                                </DropdownMenuTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuContent>
                                        <DropdownMenuArrow>222</DropdownMenuArrow>
                                        <DropdownMenuItem>sss</DropdownMenuItem>
                                        <DropdownMenuItem>xxx</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenuPortal>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.menu}>
                        <div className={styles.buttons}>
                            <div className={styles.labIcon}>
                                <img src={labIcon} alt={'labIcon'}/>
                            </div>
                            <div className={styles.bookIcon}>
                                <img src={bookIcon} alt={'bookIcon'}/>
                            </div>
                            <div className={styles.empsIcon}>
                                <img src={empsIcon} alt={'empsIcon'}/>
                            </div>
                        </div>
                        <div className={styles.tradeMark}>
                                <img src={tradeMark} alt={'tradeMark'}/>
                        </div>
                    </div>
                    <div className={styles.scene}>
                        <div className={styles.UserPreview}>
                            <div className={styles.profileIcon}>
                                <img src={profileIcon} alt='profileIcon'/>
                                <div className={styles.uploadTitle}>
                                    <img src={uploadIcon} alt='uploadIcon'/>
                                    <h6>Загрузить фото</h6>
                                </div>
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.name}>{userinfo.firstname}&nbsp;{userinfo.lastname}</div>
                                <div className={styles.signUpDate}>Зарегистрирован:&nbsp;{userinfo.signUpDate}</div>
                            </div>
                        </div>
                        <h3 className={styles.userInfoTitle}>Персональные данные</h3>
                        <div className={styles.userInfo}>
                            <div className={styles.userFIO}>
                                <h4>Фамилия</h4>
                                <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => lastname.current = v.target.value)}/>
                                <h4>Имя</h4>
                                <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => firstname.current = v.target.value)}/>
                                <h4>Отчество</h4>
                                <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => additionalname.current = v.target.value)}/>
                            </div>
                            <div className={styles.userSecondaryInfo}>
                                <h4>Должность</h4>
                                <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => dolgnost.current = v.target.value)}/>
                                <div className={styles.contacts}>
                                    <div className={styles.contact}>
                                        <h4>Email</h4>
                                        <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => email.current = v.target.value)}/>
                                    </div>
                                    <div className={styles.contact}>
                                        <h4>Телефон</h4>
                                        <Input placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => phone.current = v.target.value)}/>
                                    </div>

                                </div>           
                                <div className={styles.buttons}>
                                    {isChangingUserInfo && <button onClick={clearLabelsUserInfo} className={styles.offChanges}>Отмена</button>}
                                    <button className={styles.acceptChanges} disabled={!isChangingUserInfo}>Сохранить изменения</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userSafe}>
                            <h3>Безопастность</h3>
                            <div className={styles.session}>
                                <h5>Текущая сессия:</h5>
                                <h6 className={styles.liteText}>{userinfo.session}</h6>
                            </div>

                            {!isChangingPassword &&
                                <div>
                                    <div className={styles.lastChangePassword}>
                                        <h5>Последнее изменение пароля:</h5>
                                        <h6 className={styles.liteText}>{userinfo.passwordUpdateAt.toString()}</h6>
                                    </div>
                                    <div className={styles.passwordZone}>
                                        {userinfo.passwordUpdateAt.getTime() - new Date(Date.now()).getTime() - new Date(1970, 4, 1).getTime() <= 0 &&
                                            <h6 className={styles.passwordDanger}>Рекомендуется менять пароль каждые 3 месяца</h6> 
                                        }
                                        <button onClick={() => setIsChangingPassword(true)} className={styles.passwordButton}><div>Изменить пароль</div></button>
                                    </div>
                                </div> 
                            }
                            {isChangingPassword && 
                                <>
                                    <div className={styles.changePasswordInputs}>
                                        <div className={styles.input}>
                                            <h4>Текущий пароль</h4>
                                            <Input placeholder='Введите данные' onChange={(v) => console.log(v.target.value)}/>
                                        </div>
                                        <div className={styles.input}>
                                            <h4>Новый пароль</h4>
                                            <Input placeholder='Введите данные' onChange={(v) => console.log(v.target.value)}/>    
                                        </div>
                                        <div className={styles.input}>
                                            <h4>Повторите пароль</h4>
                                            <Input placeholder='Введите данные' onChange={(v) => console.log(v.target.value)}/>
                                        </div>
                                    </div>
                                    <div className={styles.buttons}>
                                        <button onClick={() => setIsChangingPassword(false)} className={styles.offChanges}><div>Отмена</div></button>
                                        <button className={styles.acceptChanges}><div>Сохранить пароль</div></button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}