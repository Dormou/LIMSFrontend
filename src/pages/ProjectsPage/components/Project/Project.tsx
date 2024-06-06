import { useEffect, useRef, useState } from 'react'

import { Card } from './components/Card/Card'

import { Tester, Producer, StatusTest, Card as CardType, CardStatus } from '../../../../connect/projectsApi/Types'

import actionsIcon from '../../../../source/images/icons/actions.svg'
import projectBoxIcon from '../../../../source/images/icons/project-box.svg'
import hideButtonIcon from '../../../../source/images/icons/hide-button.svg'
import acceptIcon from '../../../../source/images/icons/accept.svg'
import rejectIcon from '../../../../source/images/icons/reject.svg'
import undefinedIcon from '../../../../source/images/icons/undefined.svg'
import plusIcon from '../../../../source/images/icons/ant-design_plus-outlined.svg'
import calenarIcon from '../../../../source/images/icons/calendar.svg'

import styles from './Project.module.scss'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../Types'

interface propsProject {
    id: string
    name: string
    tester: Tester
    producer: Producer
    deadline: Date
    TYC: string
    cards: CardType[]
    changeCards: (id: string, cards: CardType[]) => void
}


export const Project = (props: propsProject) => {
    const [hide, setHide] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const _cards = useRef(props.cards)

    const statusCounts = {acceptTestCount: 0, rejectTestCount: 0, undefinedTestCount: 0}
    
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

    _cards.current
        .forEach(c => c.mandatoryTests
            .forEach(mt => mt.accept === StatusTest.accept
                ? ++statusCounts.acceptTestCount
                : mt.accept === StatusTest.undefined
                    ? ++statusCounts.undefinedTestCount
                    : ++statusCounts.rejectTestCount
            )
        )

    const getStyleDeadline = () => Date.now() + new Date(1970, 1, 3).getTime() > new Date(props.deadline).getTime()
        ? styles.deadlineLose
        : Date.now() + new Date(1970, 1, 5).getTime() > new Date(props.deadline).getTime()
            ? styles.deadlinePerLose
            : styles.deadline

    
    const getFiles = (documents: string[]) => {
        const result: File[] = []

        documents.map(async d => {
            const blob =  (await (await fetch(d)).blob())

            return result.push(new File([blob], 'doc.' + blob.type))
        })

        return result
    }

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
    
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={props.name}>{props.name}</div>
                    <img src={projectBoxIcon} className={styles.projectBox} alt={'projectBox'}/>
                    <div className={styles.tests}>
                        <div className={styles.title}>Всего тестов:</div>
                        <div className={styles.allTests}>
                            {statusCounts.acceptTestCount + statusCounts.rejectTestCount + statusCounts.undefinedTestCount}
                        </div>
                        <div className={styles.accept}>
                            <img src={acceptIcon} className={styles.acceptIcon} alt={'acceptIcon'}/>
                            {statusCounts.acceptTestCount}
                        </div>
                        <div className={styles.reject}>
                            <img src={rejectIcon} className={styles.rejectIcon} alt={'rejectIcon'}/>
                            {statusCounts.rejectTestCount}
                        </div>
                        <div className={styles.undefined}>
                            <img src={undefinedIcon} className={styles.undefinedIcon} alt={'undefinedIcon'}/>
                            {statusCounts.undefinedTestCount}
                        </div>
                    </div>
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
                    <div className={styles.TYC}>
                        <div className={styles.title}>ТУС:</div>
                        <div className={styles.name}>{props.TYC}</div>     
                    </div>
                    <div className={styles.tester}>
                        <div className={styles.title}>Инженер по Испытаниям:</div>
                        <div className={styles.firstname}>{props.tester.firstname}&nbsp;</div>
                        <div className={styles.lastname}>{props.tester.lastname}</div>
                    </div>
                    <div className={styles.producer}>
                        <div className={styles.title}>Производитель:</div>
                        <div className={styles.name}>{props.producer.name}</div>
                    </div>
                    <div className={getStyleDeadline()}>
                        <img src={calenarIcon} className={styles.calenarIcon} alt=''></img>
                        <div className={styles.date}>{new Date(props.deadline).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                    </div>
                </div>
            </div>
            {!hide && 
                <div className={styles.cards}>
                    <div className={styles.perProcess} ref={dropPerProcess}>
                        <div className={styles.title}>Очередь</div>
                        <div className={styles.cards}>
                            {_cards.current.filter(c => c.status === CardStatus.perProcess).map((c, i) => 
                                <Card
                                    key={i}
                                    id={c.id}
                                    name={c.name}
                                    documents={getFiles(c.documents)}
                                    messages={c.messages}
                                    mandatoryTests={c.mandatoryTests}
                                    nonMandatoryTests={c.nonMandatoryTests}
                                    expert={c.expert}
                                    deadline={c.deadline}
                                    release={c.release}
                                    setCards={setChangeCards}
                                />
                            )}
                        </div>
                        <button className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button>
                    </div>
                    <div className={styles.process} ref={dropProcess}>
                        <div className={styles.title}>В работе</div>
                        <div className={styles.cards}>
                            {_cards.current.filter(c => c.status === CardStatus.process).map((c, i) => 
                                <Card
                                    key={i}
                                    id={c.id}   
                                    name={c.name}
                                    documents={getFiles(c.documents)}
                                    messages={c.messages}
                                    mandatoryTests={c.mandatoryTests}
                                    nonMandatoryTests={c.nonMandatoryTests}
                                    expert={c.expert}
                                    deadline={c.deadline}
                                    release={c.release}
                                    setCards={setChangeCards}
                                />
                            )}
                        </div>
                        <button className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button>
                    </div>
                    <div className={styles.release} ref={dropRelease}>
                        <div className={styles.title}>Готово</div>
                        <div className={styles.cards}>
                            {_cards.current.filter(c => c.status === CardStatus.release).map((c, i) => 
                                <Card
                                    key={i}
                                    id={c.id}
                                    name={c.name}
                                    documents={getFiles(c.documents)}
                                    messages={c.messages}
                                    mandatoryTests={c.mandatoryTests}
                                    nonMandatoryTests={c.nonMandatoryTests}
                                    expert={c.expert}
                                    deadline={c.deadline}
                                    release={c.release}
                                    setCards={setChangeCards}
                                />
                            )}
                        </div>
                        <button className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}