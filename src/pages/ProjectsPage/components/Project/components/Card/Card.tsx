import styles from './Card.module.scss'

import chatIcon from '../../../../../../source/images/icons/chat.svg'
import docIcon from '../../../../../../source/images/icons/doc.svg'
import actionsIcon from '../../../../../../source/images/icons/actions.svg'
import calenarIcon from '../../../../../../source/images/icons/calendar.svg'
import { CardStatus, Creator, Expert, Message, Result, StatusTest, Test } from '../../../../../../connect/projectsApi/Types'
import { useDrag } from 'react-dnd'
import { DropResCard, ItemTypes } from '../../../../Types'
import { Test as CardType } from '../../../../../../connect/projectsApi/Types'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { NewCardForm } from '../NewCardForm/NewCardForm'
import { CardView } from '../InWork/InWork'
import { useUpdateTestMutation } from '../../../../../../connect/testsApi/testsApi'
import { TestStatus } from '../../../../../../connect/testsApi/Types'
import { ModalWindow } from '../../../../../components/ModalWindow/ModalWinow'
import { FullCardInQueue } from './components/FullCardInQueue/FullCardInQueue'
import { FullCardInProgress } from './components/FullCardInProgress/FullCardInProgress'
import { FullCardInDone } from './components/FullCardInDone/FullCardInDone'

interface propsCard {
    type: string
    card: CardView
    deadline: Date
    setCards: (id: string, type: string, testResult?: number) => void
    setEditingCard: (data: Test) => void
}

export const Card = (props: propsCard) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [openCard, setOpenCard] = useState(false)
    
    const _type = useRef(props.type)
    const _typeBuf = useRef(props.type)
    const _testResult = useRef(props.card.test.testResult)

    const close = () => setOpenCard(false)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.Card,

        item: props,

        end: async (item, monitor) => {
          const dropResult = monitor.getDropResult<DropResCard>()
          if (item && dropResult) {
            // const res = await updateTest({
            //     guid: props.card.test.guid, 
            //     testStatus: TestStatus[dropResult.column] - 1, 
            //     deadline: props.deadline, testResult: 
            //     props.card.test.testResult
            // })

            // if(!res["error"]) {
            //     _type.current = dropResult.column

            //     //props.setCards(props.card.test.guid, dropResult.column)
            //     setOpenCard(true)
            // }
            // else {
            //     alert("Card not moved")
            // }

            _typeBuf.current = dropResult.column

            //props.setCards(props.card.test.guid, dropResult.column)
            setOpenCard(true)
          }
        },

        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),

    }), [props])

    const onMove = async (column: number, guid: string, testResult?: number) => {
        let index = 0
        switch(column) {
            case 0: 
                _type.current = "InQueue"
                index = 0
                break
            case 1: 
                _type.current = "InProgress"
                index = 1
                break
            case 2: 
                _type.current = "Done"
                index = 2
                break
        }

        _type.current = _typeBuf.current

        if(testResult) _testResult.current = testResult
        
        console.log(testResult)

        props.setCards(props.card.test.guid, _type.current, _testResult.current)
    }

    const getTitleResult = (value: number) => value === 0
        ? "Пройдено"
        : value === 1
            ? "Провалено"
            : value === 2
                ? "Неизвестно"
                : "Не установлено"

    return (
        <>            
            {openCard &&
                <div className={styles.modalWindow}>
                    {_type.current === "InQueue" && <ModalWindow slot={<FullCardInQueue close={close} move={onMove} actualColumn={_type.current} card={props.card}/>}/>}
                    {_type.current === "InProgress" && <ModalWindow slot={<FullCardInProgress close={close} move={onMove} actualColumn={_type.current} card={props.card}/>}/>}
                    {_type.current === "Done" && <ModalWindow slot={<FullCardInDone close={close} move={onMove} actualColumn={_type.current} card={props.card}/>}/>}
                </div>
            }
            <div onClick={() => setOpenCard(true)} ref={drag} className={styles.main}>
                {openMenu &&
                    <div className={styles.actions}>
                        <div onClick={() => props.setEditingCard(props.card.test)} className={styles.action}>Редактировать</div>
                        <div className={styles.action}>Удалить</div>
                    </div>
                }
                <div className={styles.card}>
                    <div className={styles.title}>
                        <div className={styles.name}>{props.card.test.name}</div>
                        <div onClick={() => setOpenMenu(!openMenu)} className={styles.actions}>
                            <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                        </div>
                    </div>
                    <div className={styles.device}>{props.card.equipmentName}</div>
                    <div className={styles.icons}>
                        <img src={docIcon} className={styles.docIcon} alt=''/>
                        <div>{0}</div>
                        <img src={chatIcon} className={styles.chatIcon} alt=''/>
                        <div>{0}</div>
                    </div>
                    <div className={styles.result}>Результат: {getTitleResult(props.card.test.testResult)}</div>
                    <div className={styles.expert}>
                        <div className={new Date(props.deadline) >= new Date(Date.now())? styles.deadline: styles.deadlineLose}>
                            <img src={calenarIcon} className={styles.calenarIcon} alt=''/>
                            <div>{new Date(props.deadline).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}