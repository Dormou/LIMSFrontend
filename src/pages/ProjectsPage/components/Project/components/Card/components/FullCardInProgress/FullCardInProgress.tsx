import { CardView } from '../../../InWork/InWork'

import { useUpdateTestMutation } from '../../../../../../../../connect/testsApi/testsApi'

import uploadIcon from '../../../../../../../../source/images/icons/upload-icon.svg'
import nextIcon from  '../../../../../../../../source/images/icons/next.svg'
import plusIcon from '../../../../../../../../source/images/icons/ant-design_plus-outlined.svg'

import styles from './FullCardInProgress.module.scss'
import { useRef } from 'react'

interface propsFullCardInProgress {
    actualColumn?: string
    card: CardView
    move: (column: number, guid: string, testResult: number) => void
    close: () => void
}

export const FullCardInProgress = (props: propsFullCardInProgress) => {
    const [updateTest] = useUpdateTestMutation() 

    const _testResult = useRef(2)

    const move = async () => {

        const res = await updateTest({
            guid: props.card.test.guid, 
            testStatus: 2, 
            deadline: props.card.test.deadline, 
            testResult: _testResult.current
        })

        if(!res["error"]) {
            console.log(_testResult)
            props.move(2, props.card.test.guid, _testResult.current)
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
                    <div className={styles.title}>В работе</div>
                    <img className={styles.icon} src={nextIcon} alt='>'/>
                    <div className={styles.title}>Готово</div>
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
            <div className={styles.result}>
            <div className={styles.success}>
                <div className={styles.round}>
                    <input 
                        type={"checkbox"} 
                        id={"success-input"}
                        value={0}
                        onChange={(e) => _testResult.current = Number(e.target.value)}
                    ></input>
                    <label htmlFor={"success-input"}></label>
                </div>
                <div className={styles.title}>Пройдено</div>
            </div>
            <div className={styles.fail}>
                <div className={styles.round}>
                    <input 
                        type={"checkbox"} 
                        id={"fail-input"}
                        value={1}
                        onChange={(e) => _testResult.current = Number(e.target.value)}
                    ></input>
                    <label htmlFor={"fail-input"}></label>
                </div>
                <div className={styles.title}>Не пройдено</div>
            </div>
            <div className={styles.undefined}>
                <div className={styles.round}>
                    <input 
                        type={"checkbox"} 
                        id={"undefined-input"}
                        value={2}
                        onChange={(e) => _testResult.current = Number(e.target.value)}
                    ></input>
                    <label htmlFor={"undefined-input"}></label>
                </div>
                <div className={styles.title}>Неопределено</div>
            </div>
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