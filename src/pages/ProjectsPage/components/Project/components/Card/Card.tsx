import styles from './Card.module.scss'

import chatIcon from '../../../../../../source/images/icons/chat.svg'
import docIcon from '../../../../../../source/images/icons/doc.svg'
import actionsIcon from '../../../../../../source/images/icons/actions.svg'
import calenarIcon from '../../../../../../source/images/icons/calendar.svg'
import { CardStatus, Creator, Expert, Message, StatusTest, Test } from '../../../../../../connect/projectsApi/Types'
import { useDrag } from 'react-dnd'
import { DropResCard, ItemTypes } from '../../../../Types'
import { Card as CardType } from '../../../../../../connect/projectsApi/Types'
import { Dispatch, SetStateAction, useState } from 'react'
import { NewCardForm } from '../NewCardForm/NewCardForm'

interface propsCard {
    card: CardType
    setCards: (id: string, type: string) => void
    setEditingCard: (data: CardType) => void
}

export const Card = (props: propsCard) => {
    const [openMenu, setOpenMenu] = useState(false)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.Card,
        item: props,
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult<DropResCard>()
          if (item && dropResult) {
            props.setCards(props.card.id, dropResult.column)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
    }), [props])

    return (
        <div ref={drag} className={styles.main}>
            {openMenu &&
                <div className={styles.actions}>
                    <div onClick={() => props.setEditingCard(props.card)} className={styles.action}>Редактировать</div>
                    <div className={styles.action}>Удалить</div>
                </div>
            }
            <div className={styles.card}>
                <div className={styles.title}>
                    <div className={styles.name}>{props.card.name}</div>
                    <div onClick={() => setOpenMenu(!openMenu)} className={styles.actions}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </div>
                </div>
                <div className={styles.icons}>
                    <img src={docIcon} className={styles.docIcon} alt=''/>
                    <div>{props.card.documents.length}</div>
                    <img src={chatIcon} className={styles.chatIcon} alt=''/>
                    <div>{props.card.messages.length}</div>
                </div>
                <div className={styles.mandatoryTests}>
                    <div className={styles.title}>Обзательные тесты:</div>
                    <div className={styles.count}>{props.card.mandatoryTests.filter(t => t.accept === StatusTest.accept).length}/{props.card.mandatoryTests.filter(t => t.accept !== StatusTest.accept).length}</div>
                </div>
                <div className={styles.nonMandatoryTests}>
                    <div className={styles.title}>Условные тесты:</div>
                    <div className={styles.count}>{props.card.nonMandatoryTests.filter(t => t.accept === StatusTest.accept).length}/{props.card.nonMandatoryTests.filter(t => t.accept !== StatusTest.accept).length}</div>
                </div>
                <div className={styles.expert}>
                    <div className={styles.name}>{props.card.expert.firstname + ' ' + props.card.expert.lastname}</div>
                    <div className={props.card.deadline >= props.card.release? styles.deadline: styles.deadlineLose}>
                        <img src={calenarIcon} className={styles.calenarIcon} alt=''/>
                        <div>{new Date(props.card.release).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}