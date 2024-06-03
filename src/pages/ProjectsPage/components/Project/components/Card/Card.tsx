import styles from './Card.module.scss'

import chatIcon from '../../../../../../source/images/icons/chat.svg'
import docIcon from '../../../../../../source/images/icons/doc.svg'
import actionsIcon from '../../../../../../source/images/icons/actions.svg'
import calenarIcon from '../../../../../../source/images/icons/calendar.svg'
import { CardStatus, Expert, Message, StatusTest, Test } from '../../../../../../connect/projectsApi/Types'
import { useDrag } from 'react-dnd'
import { DropResCard, ItemTypes } from '../../../../Types'
import { Card as CardType } from '../../../../../../connect/projectsApi/Types'
import { Dispatch, SetStateAction } from 'react'

interface propsCard {
    id: string
    name: string
    documents: File[]
    messages: Message[]
    mandatoryTests: Test[]
    nonMandatoryTests: Test[]
    expert: Expert
    deadline: Date
    release: Date,
    setCards: (id: string, type: string) => void
}

export const Card = (props: propsCard) => {
    

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.Card,
        item: props,
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult<DropResCard>()
          if (item && dropResult) {
            props.setCards(props.id, dropResult.column)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
    }), [props])

    return (
        <div ref={drag} className={styles.main}>
            <div className={styles.card}>
                <div className={styles.title}>
                    <div className={styles.name}>{props.name}</div>
                    <div className={styles.actions}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </div>
                </div>
                <div className={styles.icons}>
                    <img src={docIcon} className={styles.docIcon} alt=''/>
                    <div>{props.documents.length}</div>
                    <img src={chatIcon} className={styles.chatIcon} alt=''/>
                    <div>{props.messages.length}</div>
                </div>
                <div className={styles.mandatoryTests}>
                    <div className={styles.title}>Обзательные тесты:</div>
                    <div className={styles.count}>{props.mandatoryTests.filter(t => t.accept === StatusTest.accept).length}/{props.mandatoryTests.filter(t => t.accept !== StatusTest.accept).length}</div>
                </div>
                <div className={styles.nonMandatoryTests}>
                    <div className={styles.title}>Условные тесты:</div>
                    <div className={styles.count}>{props.nonMandatoryTests.filter(t => t.accept === StatusTest.accept).length}/{props.nonMandatoryTests.filter(t => t.accept !== StatusTest.accept).length}</div>
                </div>
                <div className={styles.expert}>
                    <div className={styles.name}>{props.expert.firstname + ' ' + props.expert.lastname}</div>
                    <div className={props.deadline >= props.release? styles.deadline: styles.deadlineLose}>
                        <img src={calenarIcon} className={styles.calenarIcon} alt=''/>
                        <div>{new Date(props.release).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}