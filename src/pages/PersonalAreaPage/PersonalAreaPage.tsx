import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setShowHeader } from '../../connect/store'

import { UserInfo } from '../../connect/authApi/Types'

import profileIcon from '../../source/images/icons/ant-design_user-outlined.svg'
import labIcon from '../../source/images/icons/ant-design_experiment-outlined.svg'
import bookIcon from '../../source/images/icons/ant-design_book-outlined.svg'
import empsIcon from '../../source/images/icons/ant-design_team-outlined.svg'
import tradeMark from '../../source/images/icons/ant-design_trademark-circle-outlined.svg'
import uploadIcon from '../../source/images/icons/upload-icon.svg'

import { Input } from '../components/Input/Input'
import { useChangeUserInfoMutation, useChangePasswordMutation, useChangeUserPhotoMutation, useLazyGetUserInfoQuery, useLazyGetUserPhotoQuery, useGetUserPhotoQuery } from '../../connect/authApi/accountApi'
import { UserInfoResponse } from '../../connect/authApi/Responses'

import styles from "./PersonalAreaPage.module.scss"

export const PersonalAreaPage = () => {
    const navigate = useNavigate() 
    const dispatch = useDispatch()

    const localUserInfo = localStorage.getItem('lims.userinfo')
    const localUserPhoto = localStorage.getItem('lims.userPhoto')

    const {isLoading: isLoadingAvatar, data: avatar} = useGetUserPhotoQuery('test')

    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [isChangingUserInfo, setIsChangingUserInfo] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [userPhoto, setUserPhoto] = useState(avatar?.photo)
    const [userInfo, setUserInfo] = useState(localUserInfo? JSON.parse(localUserInfo) as UserInfoResponse: null) 

    const originUserinfo = useRef(userInfo?? userInfo)
    const firstname = useRef(userInfo? userInfo.firstname: '')
    const lastname = useRef(userInfo? userInfo.lastname: '')
    const additionalname = useRef(userInfo? userInfo.additionalname: '')
    const dolgnost = useRef(userInfo? userInfo.dolgnost: '')
    const email = useRef(userInfo? userInfo.email: '')
    const phone = useRef(userInfo? userInfo.phone: '')
    const newPassword = useRef('')
    const lastPassword = useRef('')
    const repeatNewPassword = useRef('')

    useEffect(() => {dispatch(setShowHeader(true))}, [])

    const [userInfoQuery, userInfoQueryResult] = useLazyGetUserInfoQuery()
    const [userPhotoQuery, userPhotoQueryResult] = useLazyGetUserPhotoQuery()
    const [changeUserPhoto] = useChangeUserPhotoMutation()
    const [changeUserInfoMutatuion] = useChangeUserInfoMutation()
    const [changePasswordMutation] = useChangePasswordMutation()

    useEffect(() =>  setUserPhoto(avatar?.photo), [avatar])

    localUserInfo?? (async () => { 
        if(userInfoQueryResult.isUninitialized) {
            const res = await userInfoQuery('test').unwrap()

            if(res!) return

            localStorage.setItem('lims.userinfo', JSON.stringify(res))

            setUserInfo(res)
        }
    })()

    // localUserPhoto?? (async () => { 
    //     if(userPhotoQueryResult.isUninitialized) {
    //         const res = await userPhotoQuery('test').unwrap()

    //        // if(!res) return

    //         localStorage.setItem('lims.userPhoto', 'res.photo')

    //         setUserPhoto(res.photo)
    //     }
    // })()

    const onWriteUserInfo = (action?: () => void) => {
        if(action) action();

        ((firstname.current !== userInfo?.firstname && firstname.current)
        || (lastname.current !== userInfo?.lastname && lastname.current)
        || (additionalname.current !== userInfo?.additionalname && additionalname.current)
        || (dolgnost.current !== userInfo?.dolgnost && dolgnost.current)
        || (email.current !== userInfo?.email && email.current)
        || (phone.current !== userInfo?.phone && phone.current))
            ? setIsChangingUserInfo(true)
            :setIsChangingUserInfo(false)    
    }

    const changePassword = async () => {
        if(newPassword.current !== repeatNewPassword.current) return

        const id = localStorage.getItem('lims.id')

        if(!id) return

        console.log(lastname.current)

        const res = await changePasswordMutation({
            id: id,
            newPassword: newPassword.current,
            lastPaswword: lastPassword.current
        })

        if(!res) return

        //ну тут с мок особого смысла нет
    }

    const changeUserInfo = async () => {
        const data = localStorage.getItem('lims.userinfo')

        if(!data) return

        const userinfo = JSON.parse(data)

        console.log(lastname.current)

        const res = await changeUserInfoMutatuion({
            id: userinfo.id,
            firstname: firstname.current,
            lastname: lastname.current,
            additionalname: additionalname.current,
            dolgnost: dolgnost.current,
            email: email.current,
            phone: phone.current
        }).unwrap()

        originUserinfo.current = {...userinfo, ...res}

        if(!originUserinfo.current) return

        //dispatch(setUserinfo({firstname: originUserinfo.current.firstname, lastname: originUserinfo.current.lastname}))

        localStorage.setItem('lims.userinfo', JSON.stringify(originUserinfo.current))

        setIsChangingUserInfo(false)
    }

    const dropChangingPassword = () => {
        firstname.current = ''
        lastname.current = ''
        additionalname.current = ''
        dolgnost.current = ''
        email.current = ''
        phone.current = ''

        setIsChangingUserInfo(false)
    }

    const changePhoto = async (value: HTMLInputElement) => {
        if(!value.files) return

        var reader = new FileReader()

        reader.readAsDataURL(value.files[0])

        reader.onloadend = async () => {
            if(!value.files) return

            var base64data = reader.result
            
            if(!base64data) return
            
            const photo = await changeUserPhoto({id: 'test', photo: base64data.toString()}).unwrap()

            if(!photo) return

            fetch(photo.photo)
            .then(async (res) => {   

                localStorage.setItem('lims.userPhoto', JSON.stringify(photo.photo))

                setUserPhoto(base64data?.toString())
            })         
        }
    }

    return (
        <div className={styles.main}>
            {userInfo && originUserinfo.current &&
                <div>
                    <div className={styles.body}>
                        <div onMouseEnter={() => setIsOpenMenu(true)} className={isOpenMenu? styles.menuOpen: styles.menu}>
                            <div className={styles.buttons}>
                                <div className={styles.labIcon}>
                                    <img src={labIcon} alt={'labIcon'}/>
                                    {isOpenMenu && <h3>Испытания</h3>}
                                </div>
                                <div className={styles.bookIcon}>
                                    <img src={bookIcon} alt={'bookIcon'}/>
                                    {isOpenMenu && <h3>Справочник</h3>}
                                </div>
                                <div className={styles.empsIcon}>
                                    <img src={empsIcon} alt={'empsIcon'}/>
                                    {isOpenMenu && <h3>Сотрудники</h3>}
                                </div>
                            </div>
                            {!isOpenMenu &&
                                <div className={styles.tradeMark}>
                                    <img src={tradeMark} alt={'tradeMark'}/>
                                </div>
                            }
                        </div>
                        <div onMouseEnter={() =>isOpenMenu? setIsOpenMenu(false): undefined} className={styles.scene}>
                            <div className={styles.UserPreview}>
                                <div className={styles.profileIcon}>
                                    <img className={userPhoto? styles.UserIcon: styles.DefUserIcon} src={userPhoto? userPhoto: profileIcon} alt='profileIcon'/>
                                    <div className={styles.uploadTitle}>
                                        <img src={uploadIcon} alt='uploadIcon'/>
                                        <input onChange={v => changePhoto(v.target)} placeholder={'Загрузить фото'} type="file" id='avatar-upload'/>
                                        <label htmlFor="avatar-upload">Загрузите фото</label>
                                    </div>
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.name}>{originUserinfo.current.firstname}&nbsp;{originUserinfo.current.lastname}</div>
                                    <div className={styles.signUpDate}>Зарегистрирован:&nbsp;{userInfo.signUpDate}</div>
                                </div>
                            </div>
                            <h3 className={styles.userInfoTitle}>Персональные данные</h3>
                            <div className={styles.userInfo}>
                                <div className={styles.userFIO}>
                                    <h4>Фамилия</h4>
                                    <Input value={isChangingUserInfo? undefined: lastname.current === ''? '': originUserinfo.current.lastname} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => lastname.current = v.target.value)}/>
                                    <h4>Имя</h4>
                                    <Input value={isChangingUserInfo? undefined: firstname.current === ''? '': originUserinfo.current.firstname} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => firstname.current = v.target.value)}/>
                                    <h4>Отчество</h4>
                                    <Input value={isChangingUserInfo? undefined: additionalname.current === ''? '': originUserinfo.current.additionalname} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => additionalname.current = v.target.value)}/>
                                </div>
                                <div className={styles.userSecondaryInfo}>
                                    <h4>Должность</h4>
                                    <Input value={isChangingUserInfo? undefined: dolgnost.current === ''? '': originUserinfo.current.dolgnost} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => dolgnost.current = v.target.value)}/>
                                    <div className={styles.contacts}>
                                        <div className={styles.contact}>
                                            <h4>Email</h4>
                                            <Input value={isChangingUserInfo? undefined: email.current === ''? '': originUserinfo.current.email} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => email.current = v.target.value)}/>
                                        </div>
                                        <div className={styles.contact}>
                                            <h4>Телефон</h4>
                                            <Input value={isChangingUserInfo? undefined: phone.current === ''? '': originUserinfo.current.phone} placeholder='Введите данные' onChange={(v) => onWriteUserInfo(() => phone.current = v.target.value)}/>
                                        </div>

                                    </div>           
                                    <div className={styles.buttons}>
                                        <button disabled={!isChangingUserInfo} onClick={dropChangingPassword} className={isChangingUserInfo? styles.offChanges: styles.offChangesHidden}>Отмена</button>
                                        <button onClick={changeUserInfo} className={styles.acceptChanges} disabled={!isChangingUserInfo}>Сохранить изменения</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.userSafe}>
                                <h3>Безопастность</h3>
                                <div className={styles.session}>
                                    <h5>Текущая сессия:</h5>
                                    <h6 className={styles.liteText}>{userInfo.session}</h6>
                                </div>

                                {!isChangingPassword &&
                                    <div>
                                        <div className={styles.lastChangePassword}>
                                            <h5>Последнее изменение пароля:</h5>
                                            <h6 className={styles.liteText}>{userInfo.passwordUpdateAt.toString()}</h6>
                                        </div>
                                        <div className={styles.passwordZone}>
                                            {new Date(userInfo.passwordUpdateAt).getTime() - new Date(Date.now()).getTime() - new Date(1970, 4, 1).getTime() <= 0 &&
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
                                                <Input placeholder='Введите данные' onChange={(v) => lastPassword.current = v}/>
                                            </div>
                                            <div className={styles.input}>
                                                <h4>Новый пароль</h4>
                                                <Input placeholder='Введите данные' onChange={(v) => newPassword.current = v}/>    
                                            </div>
                                            <div className={styles.input}>
                                                <h4>Повторите пароль</h4>
                                                <Input placeholder='Введите данные' onChange={(v) => repeatNewPassword.current = v}/>
                                            </div>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button onClick={() => setIsChangingPassword(false)} className={styles.offChanges}><div>Отмена</div></button>
                                            <button onClick={changePassword} className={styles.acceptChanges}><div>Сохранить пароль</div></button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}