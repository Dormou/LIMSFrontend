import { ErrorMessage, Field, Form, Formik } from 'formik'
import styles from './NewProjectForm.module.scss'
import { AddProjectRequest } from '../../../../connect/projectsApi/Request'

interface propsNewProjectForm {
    callback: () => void
}

export const NewProjectForm = (props: propsNewProjectForm) => {

    const addProject = (data: AddProjectRequest) => {

        props.callback()
    }

    return (
        <div className={styles.main}>
            <Formik<AddProjectRequest>
                initialValues={{
                    name: '',
                    isProcess: false,
                    tester: {
                        firstname: '',
                        lastname: ''  
                    },
                    producer: {
                        name: '',
                    },
                    deadline: new Date(Date.now()),
                    TYC: ''
                }}
                onSubmit={(data) => addProject(data)}
            >
                <Form>
                    <div className={styles.title}>Новый проект</div>
                    <div className={styles.fields}>
                        <div className={styles.left}>
                            <div className={styles.field}>
                                <div className={styles.title}>Номер проекта</div>
                                <Field type="text" name="name" placeholder="Номер проекта"/>
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Тестирумое устройствоа ТУС</div>
                                <Field type="text" name="TYC" placeholder="ТУС"/>
                                <ErrorMessage name="TYC" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Производитель</div>
                                <Field type="select" name="producer" placeholder="Производитель"/>
                                <ErrorMessage name="producer" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Испытательный центр</div>
                                <Field type="select" name="test-center" placeholder="Испытательный центр"/>
                                <ErrorMessage name="test-center" component="div" />
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.field}>
                                <div className={styles.title}>Срок завершения</div>
                                <Field type="date" name="date" placeholder="Срок завершения"/>
                                <ErrorMessage name="date" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Краткое обозначение ТУС</div>
                                <Field type="text" name="text" placeholder="Краткое обозначение ТУС"/>
                                <ErrorMessage name="text" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Инициатор испытаний</div>
                                <Field type="text" name="initer-tests" placeholder="Инициатор испытаний"/>
                                <ErrorMessage name="initer-tests" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.checkbox}>
                                    <Field type="checkbox" name="initer-is-producer"/>
                                    <div className={styles.title}>Инициатор испытаний является производитель</div>
                                </div>
                                <ErrorMessage name="initer-is-producer" component="div" />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.title}>Инженер по испытаниям </div>
                                <Field type="select" name="tester" placeholder="Инженер по испытаниям"/>
                                <ErrorMessage name="tester" component="div" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={props.callback} className={styles.cancellation}>Отмена</button>
                        <button className={styles.accept}>Принять</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}