import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useActivationMutation, useSignUpMutation } from '../../connect/authApi/authApi'
import { ActivationRequest, SignUpEmailRequest } from '../../connect/authApi/Requests'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './SignUpPage.module.scss'
import { SignUpSchema } from './services/SignUpSchema'
import { Link } from 'react-router-dom'
import { UserInfo } from '../../connect/authApi/Types'


export const SignUpPage = () => {
    const [waitCode, SetWaitCode] = useState(false) 
    
    const [signUp] = useSignUpMutation()
    const [activate] = useActivationMutation()

    const navigate = useNavigate()

    let user : UserInfo
    
    return (
        <div>
            <div className={styles.header}>
                <Link to={"#"} className={styles.helpSignUpButtonLink}>Помощь при регистрации</Link>
                <div className={styles.signUpTitle}>Регистрация нового пользователя</div>
                <Link to={"/signin"} className={styles.shotDownSignUpButtonLink}>Отменить регистрацию</Link>
            </div>
            <div className={styles.form}>
                {!waitCode &&
                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            email: '',
                            password: '',
                            confirm: '',
                        }}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true) 

                            const data = await signUp(values as SignUpEmailRequest).unwrap()

                            if(data) {
                                user = {
                                    token: 's',
                                    firstname: values.firstname,
                                    lastname: values.lastname,
                                    email: values.email
                                }
                                
                                SetWaitCode(true)
                            }
                        }}

                    >{({ isSubmitting, values }) => (     
                        <Form className={styles.fields}>
                            {values.firstname.length > 0 && <span className={styles.headerField}>Имя</span>}
                            <Field type="text" name="firstname" placeholder="имя"/>
                            <ErrorMessage name="firstname" component="div" />
                            {values.lastname.length > 0 && <span className={styles.headerField}>Фамилия</span>}
                            <Field type="text" name="lastname" placeholder="фамилия"/>
                            <ErrorMessage name="lastname" component="div" />
                            {values.email.length > 0 && <span className={styles.headerField}>Email-адрес</span>}
                            <Field type="email" name="email" placeholder="email"/>
                            <ErrorMessage name="email" component="div" />
                            {values.password.length > 0 && <span className={styles.headerField}>Пароль</span>}
                            <Field type="password" name="password" placeholder="пароль"/>
                            <ErrorMessage name="password" component="div" />
                            {values.confirm.length > 0 && <span className={styles.headerField}>Подтверждение пароля</span>}
                            <Field type="password" name="confirm" placeholder="повторите пароль"/>
                            <ErrorMessage name="confirm" component="div" />
                            <button className={styles.signUpButton} type="submit" disabled={isSubmitting}>Сохранить</button>
                        </Form>
                    )}
                    </Formik>
                }
                {waitCode &&
                    <Formik
                        initialValues={{code: ''} as ActivationRequest}
                        onSubmit={async (values, { setSubmitting }) => {

                            setSubmitting(true)

                            const data = await activate(values).unwrap()

                            if(data) {
                                user.token = data.token

                                localStorage.setItem('lims.user.token', data.token)
                                localStorage.setItem('lims.user', JSON.stringify(user))

                                navigate('/personal-area')
                            } 
                            else alert("code is bad")
                        }}
                        >{({ isSubmitting }) => (     
                            <Form className={styles.fields}>
                                <Field type="text" name="code" placeholder="code"/>
                                <ErrorMessage name="code" component="div" />
                                <button type="submit" disabled={isSubmitting}>Submit</button>
                            </Form>
                        )}
                    </Formik>
                }
            </div>
            <div className={styles.discriptionWhoDevelopment}>
                  Разработано департаментом цифровых систем управления и технологии АО "НТЦ ФСК ЕЭС"®
            </div>  
    </div> 
    )
}