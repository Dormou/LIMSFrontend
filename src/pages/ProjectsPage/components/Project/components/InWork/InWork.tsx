import { useRef, useState } from "react"
import { useDrop } from "react-dnd"

import { Application, StatusProject, Tester, TestGroup, CardStatus, Test, Executor } from "../../../../../../connect/projectsApi/Types"
import { ItemTypes } from "../../../../Types"

import { Card } from "../Card/Card"

import uploadIcon from '../../../../../../source/images/icons/upload-icon.svg'

import styles from "./InWork.module.scss"
import { useChangeCurrentStatusMutation } from "../../../../../../connect/projectsApi/projectsApi"

export type CardView = {
    equipmentGuid: string
    equipmentName: string
    test: Test
}

interface propsInWork {
    id: string
    typeName: string
    modelName: string
    executor: Executor
    producer: Application
    deadline: Date
    status: string
    dutRegistrationData: string
    testGroups: TestGroup[]
    changeCards: (id: string, cards: TestGroup[]) => void
    setEditingCard: (data: Test) => void
}

export const InWork = (props: propsInWork) => {
    const [changeStatus] = useChangeCurrentStatusMutation()
    
    const [openDoneProjectWindow, setOpenDoneProjectWindow] = useState(false)

    const _comment = useRef("")

    const createCardViews = (cards: TestGroup[]) => {
        const result: CardView[] = []

        cards.forEach(c => {
            c.tests?.map(t => {
                result.push({
                    equipmentGuid: c.equipmentGuid,
                    equipmentName: c.equipmentName,
                    test: t
                } as CardView)
            })
        })

        return result
    }

    const _testGroups = useRef(props.testGroups)
    
    const [{ canDrop: canDropPerProcess, isOver: isOverPerProcess }, dropPerProcess] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'InQueue'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const [{ canDrop: canDropProcess, isOver: isOverProcess }, dropProcess] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'InProgress'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const [{ canDrop: canDropRelease, isOver: isOverRelease }, dropRelease] = useDrop(() => ({
        accept: ItemTypes.Card,
        drop: () => ({ column: 'Done'}),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }))

    const setChangeCards = async (id: string, type: string) => {
        switch(type){
            case 'InQueue': 
                _testGroups.current = props.testGroups.map(tg => { 
                    return {
                        ...tg,
                        tests: tg.tests?.map(t => t.guid !== id? t: {...t, testStatus: 0})   
                    } as TestGroup
                })

                props.changeCards(props.id, _testGroups.current)
                
                break

            case 'InProgress':
                _testGroups.current = props.testGroups.map(tg => { 
                    return {
                        ...tg,
                        tests: tg.tests?.map(t => t.guid !== id? t: {...t, testStatus: 1})   
                    } as TestGroup
                })

                props.changeCards(props.id, _testGroups.current)

                break

            case 'Done': 
                _testGroups.current = props.testGroups.map(tg => { 
                    return {
                        ...tg,
                        tests: tg.tests?.map(t => t.guid !== id? t: {...t, testStatus: 2})   
                    } as TestGroup
                })

                props.changeCards(props.id, _testGroups.current)

                break
        }
    }

    const updateStatus = async () => {
        const res = await changeStatus({    
            projectGuid: props.id,
            StatusDescriptionName: "Done",
            message: _comment.current
        })

        if(res['error']) alert("status not changed")
    }

    return (
        <>
            {openDoneProjectWindow &&
                <div className={styles.doneWindow}>
                    <div className={styles.title}>Завершение выполнения</div>
                    <div className={styles.description}>
                        Прикреплённые документы будут отправлены заявителю, проведений испытаний будет завершено. 
                        Вы можете добавить комментарий, который будет виден заявителю.
                    </div>
                    <input onChange={e => _comment.current = e.target.value} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <div onClick={() => setOpenDoneProjectWindow(false)} className={styles.reject}>Отменить</div>
                        <div onClick={updateStatus} className={styles.accept}>Завершить выполнение</div>
                    </div>
                </div>
            }
            <div className={styles.main}>
                <div className={styles.cards}>
                    <div className={styles.perProcess} ref={dropPerProcess}>
                        <div className={styles.title}>Очередь</div>
                        <div className={styles.cards}>
                            {createCardViews(props.testGroups).filter(c => c.test.testStatus === 0).map((c, i) => 
                                <Card
                                    key={c.test.guid}
                                    type={"InQueue"}
                                    deadline={props.deadline}
                                    card={c}
                                    setCards={setChangeCards}
                                    setEditingCard={props.setEditingCard}
                                />
                            )}
                        </div>
                        {/* <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button> */}
                    </div>
                    <div className={styles.process} ref={dropProcess}>
                        <div className={styles.title}>В работе</div>
                        <div className={styles.cards}>
                            {createCardViews(props.testGroups).filter(c => c.test.testStatus === 1).map((c, i) => 
                                <Card
                                    key={c.test.guid}
                                    type={"InProgress"}
                                    card={c}
                                    deadline={props.deadline}
                                    setCards={setChangeCards}
                                    setEditingCard={props.setEditingCard}
                                />
                            )}
                        </div>
                        {/* <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button> */}
                    </div>
                    <div className={styles.release} ref={dropRelease}>
                        <div className={styles.title}>Готово</div>
                        <div className={styles.cards}>
                            {createCardViews(props.testGroups).filter(c => c.test.testStatus === 2).map((c, i) => 
                                <Card
                                    key={c.test.guid}
                                    type="Done"
                                    card={c}
                                    deadline={props.deadline}
                                    setCards={setChangeCards}
                                    setEditingCard={props.setEditingCard}
                                />
                            )}
                        </div>
                        {/* <button onClick={() => props.setAddingCard(true)} className={styles.add}>
                            <img src={plusIcon} className={styles.plusIcon} alt={'+'}/>
                        </button> */}
                    </div>
                </div>
                {createCardViews(props.testGroups).filter(c => c.test.testStatus === 2).length === createCardViews(props.testGroups).length &&
                    <div className={styles.footer}>
                        <div className={styles.filesContainer}>
                            <div className={styles.title}>Итоговые документы:&nbsp;</div>
                            <button className={styles.addfile}>
                                <img className={styles.icon} src={uploadIcon} alt='+'/>
                                <div className={styles.title}>Прекрепить фаил</div>
                            </button>
                        </div>
                        <button onClick={() => setOpenDoneProjectWindow(true)} className={styles.done}>Завершить выполнение</button>
                    </div>
                }
            </div>
        </>
    )
}