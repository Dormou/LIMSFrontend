import { Card, CardArchive, CardStatus, Message, Application, StatusTest, Tester, StatusProject } from '../../../../connect/projectsApi/Types'
import styles from './ProjectArchive.module.scss'

import actionsIcon from '../../../../source/images/icons/actions.svg'
import chatIcon from '../../../../source/images/icons/chat.svg'
import docIcon from '../../../../source/images/icons/doc.svg'
import projectBoxIcon from '../../../../source/images/icons/project-box.svg'
import hideButtonIcon from '../../../../source/images/icons/hide-button.svg'
import acceptIcon from '../../../../source/images/icons/accept.svg'
import rejectIcon from '../../../../source/images/icons/reject.svg'
import undefinedIcon from '../../../../source/images/icons/undefined.svg'
import calenarIcon from '../../../../source/images/icons/calendar.svg'
import { useRef, useState } from 'react'

interface propsProjectArchive {
    id: string
    name: string
    producer: Application
    tester: Tester
    deadline: Date
    status: StatusProject
    release: Date
    cards: CardArchive[]
    changeCards: (id: string, cards: CardArchive[]) => void
}

export const ProjectArchive = (props: propsProjectArchive) => {
    const [hide, setHide] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const _cards = useRef(props.cards)

    const getStyleDeadline = () => Date.now() + new Date(1970, 1, 3).getTime() > new Date(props.deadline).getTime()
        ? styles.deadlineLose
        : Date.now() + new Date(1970, 1, 5).getTime() > new Date(props.deadline).getTime()
            ? styles.deadlinePerLose
            : styles.deadline

    const setChangeCards = async (id: string, type: string) => {
        switch(type) {
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
                    <button onClick={() => setHide(!hide)} className={hide? styles.hideButtonActive: styles.hideButton}>
                        <img src={hideButtonIcon} className={styles.hideButton} alt={'hideButton'}/>
                    </button>
                    <button onClick={() => setOpenMenu(!openMenu)} className={styles.actionsButton}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </button>
                    {openMenu &&
                        <div className={styles.actions}>
                            <div className={styles.action}>Открыть отчет</div>
                            <div className={styles.action}>Удалить</div>
                        </div>
                    }
                </div>
                <div className={styles.description}>
                    <div className={styles.tester}>
                        <div className={styles.title}>Инженер по Испытаниям:</div>
                        <div className={styles.firstname}>{props.tester.firstname}</div>
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
            <div className={styles.scene}>
                {!hide && props.cards.map(c => 
                    <div className={styles.card}>
                        <div className={styles.title}>
                            <div className={styles.name}>{c.name}</div>
                            <div className={styles.actions}>
                                <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                            </div>
                        </div>
                        <div className={styles.icons}>
                            <img src={docIcon} className={styles.docIcon} alt=''/>
                            <div>{c.documents.length}</div>
                            <img src={chatIcon} className={styles.chatIcon} alt=''/>
                            <div>{c.messages.length}</div>
                        </div>
                        <div className={styles.expert}>
                            <div className={styles.name}>{c.expert.firstname + ' ' + c.expert.lastname}</div>
                            <div className={c.deadline >= c.release? styles.deadline: styles.deadlineLose}>
                                <img src={calenarIcon} className={styles.calenarIcon} alt=''/>
                                <div>{new Date(c.release).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                            </div>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}