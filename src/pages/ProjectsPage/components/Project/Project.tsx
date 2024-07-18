import { useEffect, useRef, useState } from 'react'

import { Card } from './components/Card/Card'

import { Tester, Application, StatusTest, Card as CardType, CardStatus, StatusProject } from '../../../../connect/projectsApi/Types'

import actionsIcon from '../../../../source/images/icons/actions.svg'
import hideButtonIcon from '../../../../source/images/icons/hide-button.svg'
import plusIcon from '../../../../source/images/icons/ant-design_plus-outlined.svg'
import calenarIcon from '../../../../source/images/icons/calendar.svg'

import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../Types'
import { getFiles } from './services'

import styles from './Project.module.scss'
import { InWork } from './components/InWork/InWork'
import { Agreement } from './components/Agreement/Agreement'

interface propsProject {
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


export const Project = (props: propsProject) => {
    const [hide, setHide] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const _cards = useRef(props.cards)

    //const statusCounts = {acceptTestCount: 0, rejectTestCount: 0, undefinedTestCount: 0}
    
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
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.typeName}>Устройство: {props.typeName}&nbsp;</div>
                    <div className={styles.modelName}>Модель: {props.modelName}</div>
                    <div className={styles.status}>Статус: {getTitleStatusProject(props.status)}</div>
                    <button onClick={() => setHide(!hide)} className={hide? styles.hideButtonActive: styles.hideButton}>
                        <img src={hideButtonIcon} className={styles.hideButton} alt={'hideButton'}/>
                    </button>
                    <button onClick={() => setOpenMenu(!openMenu)} className={styles.actionsButton}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </button>
                    {openMenu &&
                        <div className={styles.actions}>
                            <div className={styles.action}>Редактировать</div>
                            <div className={styles.action}>Открыть отчет</div>
                            <div className={styles.action}>Архивировать</div>
                            <div className={styles.action}>Удалить</div>
                        </div>
                    }
                </div>
                <div className={styles.description}>
                    <div className={styles.tester}>
                        <div className={styles.title}>Ответственный исполнитель:</div>
                        <div className={styles.firstname}>{props.tester.firstname}&nbsp;</div>
                        <div className={styles.lastname}>{props.tester.lastname}</div>
                    </div>
                    <div className={styles.producer}>
                        <div className={styles.title}>Заявитель:</div>
                        <div className={styles.name}>{props.producer.name}</div>
                    </div>
                    <div className={getStyleDeadline()}>
                        <img src={calenarIcon} className={styles.calenarIcon} alt=''></img>
                        <div className={styles.date}>{new Date(props.deadline).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                    </div>
                </div>
            </div>
            {!hide && 
                <>
                    {props.status === StatusProject.inWork &&
                        <InWork 
                            id={props.id}
                            typeName={props.typeName}
                            modelName={props.modelName}
                            tester={props.tester}
                            deadline={props.deadline}
                            status={props.status}
                            cards={props.cards}
                            producer={props.producer}
                            changeCards={props.changeCards}
                            setAddingCard={props.setAddingCard}
                            setEditingCard={props.setEditingCard}
                        />
                    }
                    {props.status === StatusProject.agreement && 
                        <Agreement
                            cards={props.cards}
                        />
                    }
                </>
            }
        </div>
    )
}