import { ErrorMessage, Field, Formik, Form } from 'formik'
import styles from './EditCardForm.module.scss'
import { Card } from '../../../../../../../../connect/projectsApi/Types'

interface propsEditCardForm {
    editCard: (data: any) => void
    close: () => void
    data: Card
}

export const EditCardForm = (props: propsEditCardForm) => {

    return (
        <div className={styles.main}>
            <Formik
                initialValues={{
                    testGroup: '',
                    mandatoryTests: props.data.mandatoryTests,
                    nonMandatoryTests: props.data.nonMandatoryTests,
                    expert: props.data.expert,
                    deadline: new Date(Date.now()),
                    description: props.data.descryption
                }}
                onSubmit={(data) => props.editCard(data)}
            >
                <Form>
                    <div className={styles.form}>
                        <div className={styles.title}>Редактировать испытание</div>
                        <div className={styles.titles}>
                            <div className={styles.creator}>Создатель:&nbsp;{props.data.creator.firstname}&nbsp;{props.data.creator.lastname}</div>
                            <div className={styles.dateCreate}>Дата создания: {new Date(props.data.createAt).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                        </div>
                        <div className={styles.testingContainer}>
                            <div className={styles.selectContainer}>
                                <div className={styles.title}>Группа тестов</div>
                                <div className={styles.select}>
                                    <Field type="select" name="testGroup" placeholder="Выберете группу"/>
                                    <ErrorMessage name="testGroup" component="div" />
                                </div>
                            </div>
                            <div className={styles.testsContainer}>
                                <div className={styles.mandatoryTests}>
                                    <div className={styles.title}>Обязательные тесты</div>
                                    <div className={styles.tests}></div>
                                </div>
                                <div className={styles.nonMandatoryTests}>
                                    <div className={styles.title}>Необязательные тесты</div>
                                    <div className={styles.tests}></div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottomTesting}>
                            <div className={styles.producer}>
                                <div className={styles.selectContainer}>
                                    <div className={styles.title}>Исполнитель</div>
                                    <div className={styles.select}>
                                        <Field type="select" name="expert" placeholder="Выберете исполнителя"/>
                                        <ErrorMessage name="expert" component="div" />
                                    </div>
                                </div>
                                <div className={styles.deadlineContainer}>
                                    <div className={styles.title}>Срок завершения</div>
                                    <div className={styles.deadline}>
                                        <Field type="date" name="deadline" placeholder=""/>
                                        <ErrorMessage name="deadline" component="div" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.descriptionContainer}>
                                <div className={styles.title}>Описание испытания</div>
                                <div className={styles.description}>
                                    <Field type="text" name="description" placeholder="Введите коментарии для исполнителя"/>
                                    <ErrorMessage name="description" component="div" />
                                    <button className={styles.file}>Прекрепить фаил</button>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={props.close} className={styles.cancellation}>Отмена</button>
                                <button className={styles.accept}>Принять</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}