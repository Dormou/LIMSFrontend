import { useRef } from "react"
import { useDrop } from "react-dnd"

import { Application, StatusProject, Tester, Card as CardType, CardStatus } from "../../../../../../connect/projectsApi/Types"
import { ItemTypes } from "../../../../Types"

import { Card } from "../Card/Card"

import plusIcon from '../../../../../../source/images/icons/ant-design_plus-outlined.svg'

import styles from "./InWork.module.scss"

interface propsInWork {
    id: string
    typeName: string
    modelName: string
    tester: Tester
    producer: Application
    deadline: Date
    status: StatusProject
    cards: CardType[]
    changeCards: (id: string, cards: CardType[]) => void
    setAddingCard: (value: boolean) => void
    setEditingCard: (data: CardType) => void
}

export const InWork = (props: propsInWork) => {
    const _cards = useRef(props.cards)
    
    const [{ canDrop: canDropPerProcess, isOver: isOverPerProcess }, dropPerProcess] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'perProcess'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const [{ canDrop: canDropProcess, isOver: isOverProcess }, dropProcess] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'process'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const [{ canDrop: canDropRelease, isOver: isOverRelease }, dropRelease] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'release'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const getStyleDeadline = () => Date.now() + new Date(1970, 1, 3).getTime() > new Date(props.deadline).getTime()
        ? styles.deadlineLose
        : Date.now() + new Date(1970, 1, 5).getTime() > new Date(props.deadline).getTime()
            ? styles.deadlinePerLose
            : styles.deadline

    const setChangeCards = async (id: string, type: string) => {
        switch(type){
            case 'perProcess': 
                _cards.current = props.cards.map(c => c.id !== id? c: {...c, status: CardStatus.perProcess})
                props.changeCards(props.id, _cards.current)
                break

            case 'process':
                _cards.current = props.cards.map(c => c.id !== id? c: {...c, status: CardStatus.process})
                props.changeCards(props.id, _cards.current)
                break

            case 'release': 
                _cards.current = props.cards.map(c => c.id !== id? c: {...c, status: CardStatus.release})
                props.changeCards(props.id, _cards.current)
                break
        }
    }

    const getTitleStatusProject = (value: StatusProject) => value === StatusProject.agreement
        ? "Согласование"
        : value === StatusProject.agreementSetup
            ? "Отправлено на согласование"
            : value === StatusProject.awaitDevice
                ? "Ожидание обородывания"
                : value === StatusProject.inWork
                    ? "В работе"
                    : value === StatusProject.release
                        ? "Завершено"
                        : "Неизвестно"

    return (
        <div className={styles.main}>
            <div className={styles.cards}>
                <div className={styles.perProcess} ref={dropPerProcess}>
                    <div className={styles.title}>Очередь</div>
                    <div className={styles.cards}>
                        {_cards.current.filter(c => c.status === CardStatus.perProcess).map((c, i) => 
                            <Card
                                key={i}
                                card={c}
                                setCards={setChangeCards}
                                setEditingCard={props.setEditingCard}
                            />
                        )}
                    </div>
                    <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                        <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                    </button>
                </div>
                <div className={styles.process} ref={dropProcess}>
                    <div className={styles.title}>В работе</div>
                    <div className={styles.cards}>
                        {_cards.current.filter(c => c.status === CardStatus.process).map((c, i) => 
                            <Card
                                key={i}
                                card={c}
                                setCards={setChangeCards}
                                setEditingCard={props.setEditingCard}
                            />
                        )}
                    </div>
                    <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                        <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                    </button>
                </div>
                <div className={styles.release} ref={dropRelease}>
                    <div className={styles.title}>Готово</div>
                    <div className={styles.cards}>
                        {_cards.current.filter(c => c.status === CardStatus.release).map((c, i) => 
                            <Card
                                key={i}
                                card={c}
                                setCards={setChangeCards}
                                setEditingCard={props.setEditingCard}
                            />
                        )}
                    </div>
                    <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                        <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                    </button>
                </div>
            </div>
        </div>
    )
}