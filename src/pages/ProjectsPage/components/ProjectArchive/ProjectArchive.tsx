import { Card, CardArchive, Message, Producer, StatusTest, Tester } from '../../../../connect/projectsApi/Types'
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
import { useState } from 'react'

interface propsProjectArchive {
    id: string
    name: string
    producer: Producer
    tester: Tester
    deadline: Date
    release: Date
    TYC: string
    cards: CardArchive[]
    changeCards: (id: string, cards: Card[]) => void
}

export const ProjectArchive = (props: propsProjectArchive) => {
    const [hide, setHide] = useState(false)

    const statusCounts = {acceptTestCount: 0, rejectTestCount: 0, undefinedTestCount: 0}

    props.cards
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
                    <button onClick={() => setHide(!hide)} className={styles.actionsButton}>
                        <img src={actionsIcon} className={styles.actionsIcon} alt={'actionsIcon'}/>
                    </button>
                </div>
                <div className={styles.description}>
                    <div className={styles.TYC}>
                        <div className={styles.title}>ТУС:</div>
                        <div className={styles.name}>{props.TYC}</div>     
                    </div>
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
                {props.cards.map(c => 
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
                        <div className={styles.mandatoryTests}>
                            <div className={styles.title}>Обзательные тесты:</div>
                            <div className={styles.counts}>
                                <img src={acceptIcon} className={styles.acceptIcon} alt={'accept: '}/>
                                <div className={styles.count}>{c.mandatoryTests.filter(t => t.accept === StatusTest.accept).length}</div>
                                <img src={rejectIcon} className={styles.acceptIcon} alt={'reject: '}/>
                                <div className={styles.count}>{c.mandatoryTests.filter(t => t.accept === StatusTest.reject).length}</div>
                                <img src={undefinedIcon} className={styles.acceptIcon} alt={'undefined: '}/>
                                <div className={styles.count}>{c.mandatoryTests.filter(t => t.accept === StatusTest.undefined).length}</div>
                            </div>
                        </div>
                        <div className={styles.nonMandatoryTests}>
                            <div className={styles.title}>Условные тесты:</div>
                            <div className={styles.count}>{c.nonMandatoryTests.filter(t => t.accept === StatusTest.accept).length}/{c.nonMandatoryTests.filter(t => t.accept !== StatusTest.accept).length}</div>
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