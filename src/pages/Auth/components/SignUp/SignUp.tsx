import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useActivationMutation, useSignUpMutation } from '../../../../connect/authApi/accountApi'
import { ActivationRequest, SignUpEmailRequest } from '../../../../connect/authApi/Requests'

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { SignUpSchema } from './services/SignUpSchema'
import { Link } from 'react-router-dom'

import styles from './SignUp.module.scss'

interface propsSignUp {
    closeSignUp: (status: string, email: string) => void
}

export const SignUp = (props: propsSignUp) => {    
    const [signUp] = useSignUpMutation()

    const isConfirmFrom = useRef(true)
    
    const isHaveEmptyField = (values: any) => Object.values(values).some(value => value === "")
        ? isConfirmFrom.current = true
        : isConfirmFrom.current = false

    return (
        <div className={styles.main}>
            <div className={styles.form}>
                {
                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            additionalname: '',
                            dolgnost: '',
                            orgname: '',
                            orgaddress: '',
                            phone: '',
                            email: ''
                        }}
                        validationSchema={SignUpSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true) 

                            try{
                                const data = await signUp(values as SignUpEmailRequest).unwrap()

                                if(data) props.closeSignUp('accept', values.email)
                                else props.closeSignUp('reject', values.email)
                            } catch (e) {
                                console.warn(e)

                                props.closeSignUp('reject', values.email)
                            }
                        }}

                    >{({ isSubmitting, values }) => (     
                        <Form className={styles.fields}>
                            <h2 className={styles.mainTitle}>Регистрация в АИС Управление ИЛЦС</h2>
                            <div className={styles.FIO}>
                                <div className={styles.field}>
                                    <span className={styles.headerField}>Имя</span>
                                    <Field type="text" name="firstname" placeholder="Введите имя"/>
                                    <ErrorMessage name="firstname" component="div" />
                                </div>

                                <div className={styles.field}>
                                    <span className={styles.headerField}>Фамилия</span>
                                    <Field type="text" name="lastname" placeholder="Введите фамилию"/>
                                    <ErrorMessage name="lastname" component="div" />
                                </div>
                                    <div className={styles.field}>
                                    <span className={styles.headerField}>Отчество</span>
                                    <Field type="text" name="additionalname" placeholder="Введите отчество"/>
                                    <ErrorMessage name="additionalname" component="div"/>
                                </div>
                            </div>

                            <span className={styles.headerField}>Должность</span>
                            <Field type="text" name="dolgnost" placeholder="Введите должность"/>
                            <ErrorMessage name="dolgnost" component="div"/>

                            <span className={styles.headerField}>Наименование организации</span>
                            <Field type="text" name="orgname" placeholder="Введите наименование"/>
                            <ErrorMessage name="orgname" component="div"/>
                            
                            <span className={styles.headerField}>Адрес организации</span>
                            <Field type="text" name="orgaddress" placeholder="Введите адрес"/>
                            <ErrorMessage name="orgaddress" component="div"/>

                            <div className={styles.contacts}>
                                <div className={styles.field}>
                                    <span className={styles.headerField}>Email-адрес</span>
                                    <Field type="email" name="email" placeholder="Введите email"/>
                                    <ErrorMessage name="email" component="div" />                                         
                                </div>
                                <div className={styles.field}>
                                    <span className={styles.headerField}>Телефон</span>
                                    <Field type="phone" name="phone" placeholder="Введите номер телефона"/>
                                    <ErrorMessage name="phone" component="div" />    
                                </div>
                            </div>
                            <div className={styles.preButtonsText}>Нажимая “Зарегистрироваться”, я подтверждаю, что даю согласие на обработку персональных данных.</div>
                            <div className={styles.buttons}>
                                <button onClick={() => props.closeSignUp('close', values.email)} className={styles.exitSignUpButton} disabled={isSubmitting}>Отмена</button>    
                                <button onClick={() => isHaveEmptyField(values)} className={styles.signUpButton} type="submit" disabled={isSubmitting && isConfirmFrom.current}>Зарегестироваться</button>    
                            </div>
                        </Form>
                    )}
                    </Formik>
                }
            </div>
    </div> 
    )
}