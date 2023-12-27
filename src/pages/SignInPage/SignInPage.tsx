import { ErrorMessage, Field, Formik, Form } from "formik"
import { useSignInMutation } from "../../connect/authApi/authApi"
import { useNavigate } from "react-router-dom"
import { SignInEmailRequest } from "../../connect/authApi/Requests"
import logo from "../../source/images/LogoBig.png"
import styles from './SignInPage.module.scss'

export const SignInPage = () => {
    const [signIn] = useSignInMutation()

    const navigate = useNavigate()
    
    return(
        <div>    
            <img className={styles.logo} src={logo} alt="Logo"/>       
            <div className={styles.form}>
                <div className={styles.welcomeText}>Добро пожаловать!</div>
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
                            <button className={styles.signInButton} type="submit" disabled={isSubmitting}>Войти</button>
                            <button className={styles.signUpButton} onClick={() => navigate("/signup")}>Зарегистрироваться</button>
                        </Form>
                    )}
                </Formik>  
            </div>
        </div>
    )
}