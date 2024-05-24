import { ErrorMessage, Field, Formik, Form } from "formik"

import { useLazyGetUserInfoQuery, useSignInMutation } from "../../connect/authApi/accountApi"
import { Link, useNavigate } from "react-router-dom"
import { SignInEmailRequest } from "../../connect/authApi/Requests"

import logoBanner from "../../source/images/logos/a1069ceebd4d50ad1dfc224ff5406fc4.png"
import banner from "../../source/images/banners/authBanner.jpeg"

import { useAppDispatch, setFooter, setScrollX, setScrollY, setShowHeader, setShowFooter } from '../../connect/store'
import { useEffect, useRef, useState } from "react"

import { Footer } from "../components/Footer/Footer"
import { SignUp } from "./components/SignUp/SignUp"

import styles from './AuthPage.module.scss'
import { useSelector } from "react-redux"


const GetFooter = () => {

    return (
        <div className={styles.footer}>"Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®"</div>
    )
}

export const AuthPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [signIn, signInResult] = useSignInMutation()
    const [userInfoQuery, userInfo] = useLazyGetUserInfoQuery()

    const [isSignUp, setIsSignUp] = useState(false)
    const [rejectWindow, setRejectWindow] = useState(false)
    const [acceptWindow, setAcceptWindow] = useState(false)

    const email = useRef('')
    
    useEffect(() => {dispatch(setShowHeader(false))}, [])
    useEffect(() => {dispatch(setFooter(setShowFooter(true)))}, [])
    useEffect(() => {dispatch(setScrollX(false))}, [])
    useEffect(() => {dispatch(setScrollY(false))}, [])

    useEffect(() => { 
        if(rejectWindow) setTimeout(() => {
            setRejectWindow(false)
            dispatch(setShowFooter(true))
        }, 5000)
    }, [rejectWindow])

    useEffect(() => {
        if(acceptWindow) setTimeout(() => {
            setAcceptWindow(false)
            dispatch(setShowFooter(true))
        }, 15000)
    }, [acceptWindow])

    const closeAcceptWindow = () => {
        setAcceptWindow(false)
        dispatch(setShowFooter(true))
    }
    

    const onClickToSignUp = () => {
        dispatch(setShowFooter(false))

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
                dispatch(setFooter({show: true, value: <Footer slot={<GetFooter/>}/>}))
                break
        }       
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
                                
                                console.log(data)

                                localStorage.setItem('lims.userinfo', JSON.stringify(await userInfoQuery(data.id).unwrap()))
                                localStorage.setItem(`lims.token`, data.token)
                                localStorage.setItem(`lims.id`, data.id)

                                navigate("/personal-area")
                            }}
                            >{({ isSubmitting }) => (     
                                <Form className={styles.fields}>
                                    <Field type="email" name="email" placeholder="email"/>
                                    <ErrorMessage name="email" component="div" />
                                    <Field type="password" name="password" placeholder="password"/>
                                    <ErrorMessage name="password" component="div" />
                                    <Link to={"/"} className={styles.fogotPassword}>Восстановить пароль</Link>
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
        </div>
    )
}