import { ErrorMessage, Field, Formik, Form } from "formik"

import { useSignInMutation } from "../../connect/authApi/authApi"
import { Link, useNavigate } from "react-router-dom"
import { SignInEmailRequest } from "../../connect/authApi/Requests"

import logoBanner from "../../source/images/logos/a1069ceebd4d50ad1dfc224ff5406fc4.png"
import banner from "../../source/images/banners/authBanner.jpeg"

import { useAppDispatch, setFooter, setScrollX, setScrollY } from '../../connect/store'
import { useEffect, useRef, useState } from "react"

import { Footer } from "../components/Footer/Footer"
import { SignUp } from "./components/SignUp/SignUp"

import styles from './AuthPage.module.scss'
import { useSelector } from "react-redux"


const getFooter = () => {

    return (
        <div className={styles.footer}>"Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®"</div>
    )
}

export const AuthPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [signIn] = useSignInMutation()

    const [isSignUp, setIsSignUp] = useState(false)
    const [rejectWindow, setRejectWindow] = useState(false)
    const [acceptWindow, setAcceptWindow] = useState(false)
    const [recoveryPasswordWindow, setRecoveryPasswordWindow] = useState('')

    const footer = useRef(useSelector((state: any) => state.footer))
    const email = useRef('')
    
    useEffect(() => {dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))}, [])
    useEffect(() => {dispatch(setScrollX(false))}, [])
    useEffect(() => {dispatch(setScrollY(false))}, [])

    useEffect(() => { 
        if(rejectWindow) setTimeout(() => {
            setRejectWindow(false)
            dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
        }, 5000)
    }, [rejectWindow])

    useEffect(() => {
        if(acceptWindow) setTimeout(() => {
            setAcceptWindow(false)
            dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
        }, 15000)
    }, [acceptWindow])

    useEffect(() => {
        if(recoveryPasswordWindow === 'message') setTimeout(() => {
            setRecoveryPasswordWindow('')
            dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
        }, 10000)
    }, [recoveryPasswordWindow])

    const closeAcceptWindow = () => {
        setAcceptWindow(false)
        dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
    }

    const acceptRecoveryPasswordWindow  = () => {
        setRecoveryPasswordWindow('message')
        dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
    }

    const closeRecoveryPasswordWindow = () => {
        setRecoveryPasswordWindow('')
        dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
    }
    

    const onClickToSignUp = () => {
        dispatch(setFooter({...footer.current, ['show']: false}))

        setIsSignUp(true)
    }

    const closeSignUp = (status: string, _email: string) => {  
        email.current = _email

        setIsSignUp(false)

        //dispatch(setFooter({...footer.current, ['show']: true}))

        switch (status) {
            case 'accept': 
                setAcceptWindow(true)
                break
            case 'reject':
                setRejectWindow(true) 
                break   
            default: 
                dispatch(setFooter({show: true, value: <Footer slot={getFooter()}/>}))
                break
        }       
    }

    const onClickRecovery = () => {
        dispatch(setFooter({...footer.current, ['show']: false}))

        setRecoveryPasswordWindow('label')
    }

    return(
        <div className={styles.main}>    
            <div className={isSignUp || rejectWindow || acceptWindow? styles.blur: styles.none}>
                <img className={styles.bannerLogo} src={logoBanner} alt="logoBanner"/>
                <h1 className={styles.bannerText}>АИС Управление ИЛЦС</h1>
                <img className={styles.banner} src={banner} alt="Banner"></img>
                <div className={styles.formContainer}>
                    <div className={styles.form}>
                        <h1 className={styles.welcomeText}>Вход в систему</h1>
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            } as SignInEmailRequest}
                            onSubmit={async (values, {setSubmitting }) => {
                                setSubmitting(false)

                                const data = await signIn(values).unwrap()

                                localStorage.setItem(`library.token`, data.token)

                                navigate("/")
                            }}
                            >{({ isSubmitting }) => (     
                                <Form className={styles.fields}>
                                    <Field type="email" name="email" placeholder="email"/>
                                    <ErrorMessage name="email" component="div" />
                                    <Field type="password" name="password" placeholder="password"/>
                                    <ErrorMessage name="password" component="div" />
                                    <div onClick={onClickRecovery} className={styles.fogotPassword}>Восстановить пароль</div>
                                    <button className={styles.signInButton} type="submit" disabled={isSubmitting}>Войти</button>
                                    <button className={styles.signUpButton} onClick={onClickToSignUp}>Зарегистрироваться</button>
                                </Form>
                            )}
                        </Formik>  
                    </div>
                </div>
            </div>
            {isSignUp && 
                <div className={styles.signUp}>
                    <SignUp closeSignUp={closeSignUp}/>
                </div>
            }
            {rejectWindow &&
                <div className={styles.rejectWindow}>
                    <h3>Регистрация в АИС Управление ИЛЦС</h3>
                    <text>
                        ОШИБКА СЕРВЕРА! Попробуйте позже.
                    </text>
                </div>
            }
            {acceptWindow &&
                <div className={styles.acceptWindow}>
                    <button onClick={closeAcceptWindow} className={styles.closeButton}>Х</button>
                    <h4>Регистрация в АИС Управление ИЛЦС</h4>
                    <div>
                        На адрес {email.current} отправлено письмо с инструкцией по установке пароля. 
                        Пожалуйста, выполните инструкции в письме для завершения регистрации. 
                        <br/>-<br/>
                        Если письмо не пришло, проверьте папку “Спам” или обратитесь в службу технической поддержки&nbsp; 
                        <a  href= "mialto: supportftcsoftware@ftc-energo.ru" className={styles.emailSupport}>
                            supportftcsoftware@ftc-energo.ru
                        </a>
                        <br/><button onClick={closeAcceptWindow} className={styles.button}>OK</button>
                    </div>
                </div>
            }
            {recoveryPasswordWindow === 'label' &&
                <div className={styles.recoveryPasswordWindow}>
                    <button onClick={closeRecoveryPasswordWindow} className={styles.closeButton}>Х</button>
                    <h3>Восcтановление пароля</h3>
                    <h4 className={styles.recEmail}>Email</h4>
                    <input>
                    </input>
                    <br/><button onClick={acceptRecoveryPasswordWindow} className={styles.button}>OK</button>
                </div>
            }
            {recoveryPasswordWindow === 'message' &&
                <div className={styles.recoveryPasswordWindowMessage}>
                    <button onClick={closeAcceptWindow} className={styles.closeButton}>Х</button>
                    <h4>Восcтановление пароля</h4>
                    <div>
                        На адрес {email.current} отправлено письмо с инструкцией по установке пароля. 
                        Пожалуйста, выполните инструкции в письме для восстановления пароля. 
                        <br/>-<br/>
                        Если письмо не пришло, проверьте папку “Спам” или обратитесь в службу технической поддержки&nbsp; 
                        <a  href= "mialto: supportftcsoftware@ftc-energo.ru" className={styles.emailSupport}>
                            supportftcsoftware@ftc-energo.ru
                        </a>
                        <br/><button onClick={closeRecoveryPasswordWindow} className={styles.button}>OK</button>
                    </div>
                </div>
            }
        </div>
    )
}