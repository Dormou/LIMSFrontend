import { 
    DropdownMenu, 
    DropdownMenuArrow,
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuPortal,
    DropdownMenuTrigger 
} from '@radix-ui/react-dropdown-menu'

import headerLogo from '../../../source/images/logos/header-pa-logo.png'
import profileIcon from '../../../source/images/icons/ant-design_user-outlined.svg'
import notificationIcon from '../../../source/images/icons/notification-icon.svg'
import settingsIcon from '../../../source/images/icons/ant-design_setting-outlined.svg'
import signoutIcon from '../../../source/images/icons/ant-design_logout-outlined.svg'

import styles from './Header.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setShowHeader } from '../../../connect/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGetUserPhotoQuery } from '../../../connect/authApi/accountApi'
import { personalAreaPath } from '../../../App'
import { Notifications } from './components/Notifications/Notifications'

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    console.log(location)

    const {data: avatar} = useGetUserPhotoQuery('test')

    const userinfoLocal = localStorage.getItem('lims.userinfo')

    const [userinfo, setUserInfo] = useState(userinfoLocal? JSON.parse(userinfoLocal): null)
    const [userPhoto, setUserPhoto] = useState(avatar?.photo)

    const show = useSelector((state: any) => state.header.show)

    useEffect(() =>  setUserPhoto(avatar?.photo), [avatar])
    useEffect(() => void(show? (userinfo? dispatch(setShowHeader(true)): dispatch(setShowHeader(false))): undefined), [userinfo])

    if(!userinfo) {
        dispatch(setShowHeader(false))
        return <></>
    } 

    const watchUserInfoLocal = (
        storage: Storage,
        methods: string[],
        collections: {name: string, callback: (...args: any) => void }[],
      ) => {

        for (let method of methods) {
          const original = storage[method].bind(storage);

          const newMethod = function (...args) {
            const result = original.apply(null, args)

            const item = collections.find(i => i.name === args[0])

            if(item) item.callback(args[1])

            return result
          }

          storage[method] = newMethod.bind(storage);
        }       
    } 

    watchUserInfoLocal(
        window.localStorage,
        ['setItem', 'removeItem'],
        [
            {name: 'lims.userinfo', callback: (value) => value? setUserInfo(JSON.parse(value)): setUserInfo(undefined)},
            {name: 'lims.userPhoto', callback: (value) => value? setUserPhoto(JSON.parse(value)): setUserPhoto(undefined)},
        ]
    )

    const signout = () => {
        localStorage.removeItem('lims.token')
        localStorage.removeItem('lims.id')
        localStorage.removeItem('lims.userinfo')
        localStorage.removeItem('lims.userPhoto')

        navigate('/')
    }

    return (
            <div className={styles.header}>
            <img className={styles.headerLogo} src={headerLogo} alt="headerLogo"/>
            <h3 className={styles.headerText}>АИС Управление ИЛЦС</h3>
            <div className={styles.profileHeader}>
                <Notifications userid={userinfo.id}/>
                <div className={userPhoto? styles.profileIcon: styles.profileIconDef}>
                    <img src={userPhoto? userPhoto: profileIcon} alt='profileIcon'></img>
                </div>
                <div className={styles.profileDropdown}>
                    <DropdownMenu>
                        <DropdownMenuTrigger className={styles.dropdownMenuTrigger}>
                            <div className={styles.dropdownMenuText}>{userinfo.firstname}&nbsp;{userinfo.lastname}</div>
                            <div className={styles.dropdownMenuIcon}></div>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuContent style={styles} className={styles.dropdownMenuContent}>
                                <DropdownMenuArrow><div className={styles.dropdownMenuIcon}></div></DropdownMenuArrow>
                                {location.pathname !== personalAreaPath && 
                                    <DropdownMenuItem onClick={() => navigate(personalAreaPath)} id={'menuItem'} className={styles.menuItem}> 
                                        <div className={styles.ddLabel}>
                                            <img className={styles.profileIcon} src={profileIcon} alt={'profileIcon'}/>
                                            <div>Личный кабинет&nbsp;</div>
                                        </div>                 
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuItem className={styles.menuItem}>
                                    <div className={styles.ddLabel}>
                                        <img className={styles.settingsIcon} src={settingsIcon} alt={'settingsIcon'}/>
                                        <div>Поддержка&nbsp;</div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={signout} className={styles.menuItemExit}>
                                    <div className={styles.ddLabel}>
                                        <img className={styles.signoutIcon} src={signoutIcon} alt={'signoutIcon'}/>
                                        <div>Выход&nbsp;</div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}