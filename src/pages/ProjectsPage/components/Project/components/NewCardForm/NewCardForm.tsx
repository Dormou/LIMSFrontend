import { ErrorMessage, Field } from 'formik'
import styles from './NewCardForm.module.scss'

export const NewCardForm = () => {

    return (
        <div className={styles.main}>
            <div className={styles.title}>Новое испытание</div>
            <div className={styles.testsContainer}>
                <div className={styles.selectContainer}>
                    <div className={styles.title}>Группа тестов</div>
                    <div className={styles.select}>
                        <Field type="select" name="testGroup" placeholder="Выберете группу"/>
                        <ErrorMessage name="testGroup" component="div" />
                    </div>
                </div>
                <div className={styles.tests}>
                    <div className={styles.mandatoryTests}>
                        <div className={styles.title}></div>
                        <div className={styles.tests}></div>
                    </div>
                    <div className={styles.nonMandatoryTests}>
                        <div className={styles.title}></div>
                        <div className={styles.tests}></div>
                    </div>
                </div>
            </div>
            <div className={styles.producer}>
                <div className={styles.selectContainer}>
                    <div className={styles.title}>Изготовитель</div>
                    <div className={styles.select}>
                        <Field type="select" name="producer" placeholder="Выберете изготовителя"/>
                        <ErrorMessage name="producer" component="div" />
                    </div>
                </div>
                <div className={styles.deadlineContainer}>
                    <div className={styles.title}>Срок завершения</div>
                    <div className={styles.deadline}></div>
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.description}>
                    <div className={styles.title}>Описание испытания</div>
                    <div className={styles.text}>
                        <Field type="text" name="description" placeholder="Введите коментарии для исполнителя"/>
                        <ErrorMessage name="description" component="div" />
                    </div>
                </div>
                <button className={styles.file}></button>
            </div>
            <div className={styles.buttons}>
                <button className={styles.cancellation}>Отмена</button>
                <button className={styles.accept}>Принять</button>
            </div>
        </div>
    )
}