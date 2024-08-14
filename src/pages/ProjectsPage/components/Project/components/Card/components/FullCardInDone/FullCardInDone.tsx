import { CardView } from '../../../InWork/InWork'

import { useUpdateTestMutation } from '../../../../../../../../connect/testsApi/testsApi'

import uploadIcon from '../../../../../../../../source/images/icons/upload-icon.svg'
import nextIcon from  '../../../../../../../../source/images/icons/next.svg'
import plusIcon from '../../../../../../../../source/images/icons/ant-design_plus-outlined.svg'

import styles from './FullCardInDone.module.scss'

interface propsFullCardInDone {
    actualColumn?: string
    card: CardView
    move: (column: number, guid: string) => void
    close: () => void
}

export const FullCardInDone = (props: propsFullCardInDone) => {
    const [updateTest] = useUpdateTestMutation() 

    const move = async () => {
        const res = await updateTest({
            guid: props.card.test.guid, 
            testStatus: 1, 
            deadline: props.card.test.deadline, 
            testResult: props.card.test.testResult
        })

        if(!res["error"]) {

            props.move(1, props.card.test.guid)
        }
        else {
            alert("Card not moved")
        }
    }

    return (
        <div className={styles.main}>
            <img onClick={props.close} className={styles.close} src={plusIcon} alt="[close]"/>
            <div className={styles.name}>{props.card.test.name}</div>
            <div className={styles.equipmentName}>{props.card.equipmentName}</div>
            <div className={styles.inline}>  
                <div className={styles.createAt}>
                    <div className={styles.title}>Дата создания:&nbsp;</div>
                    <div className={styles.value}>{new Date(Date.now()).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                </div>
                <div className={styles.deadline}>
                    <div className={styles.title}>Срок завершения:&nbsp;</div>
                    <div className={styles.value}>{new Date(props.card.test.deadline).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                </div>
                <button onClick={move} className={styles.next}>
                    <div className={styles.title}>Готово</div>
                    <img className={styles.icon} src={nextIcon} alt='>'/>
                    <div className={styles.title}>В работе</div>
                </button>
            </div>
            <div className={styles.description}>
                <div className={styles.title}>Описание:&nbsp;</div>
                <div className={styles.value}>{props.card.test.description}</div>
            </div>
            <div className={styles.files}>
                <div className={styles.title}>Документы к тесту:&nbsp;</div>
                <button className={styles.addfile}>
                    <img className={styles.icon} src={uploadIcon} alt='+'/>
                    <div className={styles.title}>Прекрепить фаил</div>
                </button>
            </div>
            <div className={styles.commentConteiner}>
                <div className={styles.comment}>
                    <div className={styles.title}>Комментарии:&nbsp;</div>
                    <div className={styles.value}>Комментарии к карточке</div>
                </div>
                <input placeholder={"Напишите комментарии..."} className={styles.addcomment}></input>
            </div>
        </div>
    )
}