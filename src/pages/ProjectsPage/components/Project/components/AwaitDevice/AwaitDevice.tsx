import { useEffect, useRef, useState } from "react"

import { TestGroup } from "../../../../../../connect/projectsApi/Types"
import { useFetchInternalUsersQuery } from "../../../../../../connect/userApi/userApi"
import { FetchInternalUsersResponse } from "../../../../../../connect/userApi/Responses"

import { useChangeCurrentStatusMutation, useUpdateProjectMutation } from "../../../../../../connect/projectsApi/projectsApi"

import plusIcon from "../../../../../../source/images/icons/ant-design_plus-outlined.svg"

import styles from "./AwaitDevice.module.scss"

interface propsAwaitDevice {
    projectId: string
    dutRegistrationData: string
    testGroups: TestGroup[]
}

type Users = FetchInternalUsersResponse

type Test = {
    testDescriptionId: string, 
    testsGroupId: string
}

export const AwaitDevice = (props: propsAwaitDevice) => {
    const {isLoading: isLoadingUsers, data: usersData} = useFetchInternalUsersQuery({limit: 30, numberSkip: 0})
    const [updateProject] = useUpdateProjectMutation()
    const [changeStatus] = useChangeCurrentStatusMutation()

    const [users, setUsers] = useState([] as Users)
    const [openSendAwaitDeviceWindow, setOpenSendAwaitDeviceWindow] = useState(false)
    const [commentIsValid, setCommentIsValid] = useState(false)
    const [testsGroupsIdsDroped, setTestsGroupsIdsDroped] = useState([] as string[])

    useEffect(() => { setUsers(usersData? usersData: [])}, [usersData])

    const deadline = useRef(new Date(Date.now()))
    const executorId = useRef("")
    const tests = useRef([] as Test[])
    const comment = useRef("")

    const [isNotValidForm, setIsNotValidForm] = useState(true)

    const decarator = (callback: () => void) => {
        callback()
  
        if(deadline.current > new Date(Date.now()) && executorId.current !== "" && tests.current.length !== 0) setIsNotValidForm(false)    
        else if(!isNotValidForm) setIsNotValidForm(true)  
    }

    const checkComment = (value: string) => {
        comment.current = value
        
        if(value.length > 0) setCommentIsValid(true)
        else setCommentIsValid(false)
    }

    useEffect(() => {

    }, [tests, ])

    const update = async () => {
        const res = await updateProject({
            guid: props.projectId,
            executorGuid: executorId.current,
            deadline: deadline.current,
            dutRegistrationData: props.dutRegistrationData,
            testDescriptionsIds: tests.current.filter(t => testsGroupsIdsDroped.find(tgid => t.testsGroupId === tgid) === undefined).map(t => t.testDescriptionId)
        }).unwrap()

        if(res) {
            await changeStatus({    
                projectGuid: props.projectId,
                StatusDescriptionName: "UnderApproval",
                message: comment.current
            }).unwrap()

            
        }
    }

    return (
        <div className={styles.main}>
            {openSendAwaitDeviceWindow &&
                <div className={styles.sendAwaitDeviceWindow}>
                    <div className={styles.title}>Отправка на согласование</div>
                    <div className={styles.description}>
                        Прикреплённые документы будут отправлены заявителю для согласования. 
                        Вы можете добавить комментарий, который будет виден заявителю.
                    </div>
                    <div className={styles.subtitle}>Комментарии</div>
                    <input onChange={e => checkComment(e.target.value)} className={styles.comment}></input>
                    <div className={styles.buttons}>
                        <button onClick={() => setOpenSendAwaitDeviceWindow(false)} className={styles.reject}>Отмена</button>
                        <button onClick={() => update()} disabled={!commentIsValid} className={styles.accept}>Отправить на согласование</button>
                    </div>
                </div>
            }
            <div className={styles.equipmentsList}>
                {props.testGroups.map(tg => 
                    <div className={styles.equipment}>
                        <div className={styles.title}>{tg.equipmentName}</div>
                        {!testsGroupsIdsDroped.find(tgid => tgid === tg.equipmentGuid) &&
                            <div onClick={() => setTestsGroupsIdsDroped(testsGroupsIdsDroped.concat(tg.equipmentGuid))} className={styles.buttonDrop}>
                                <img className={styles.buttonDropIcon} src={plusIcon} alt="-"/>
                            </div>
                        }
                        {testsGroupsIdsDroped.find(tgid => tgid === tg.equipmentGuid) &&
                            <div onClick={() => setTestsGroupsIdsDroped(testsGroupsIdsDroped.filter(tgid => tgid !== tg.equipmentGuid))} className={styles.buttonAccept}>
                                <img className={styles.buttonAcceptIcon} src={plusIcon} alt="+"/>
                            </div>
                        }
                    </div>
                )}
            </div>
            <div className={styles.equipments}>
                {props.testGroups.filter(tg => testsGroupsIdsDroped.find(tgid => tgid === tg.equipmentGuid) === undefined).map(tg => 
                    <div key={tg.equipmentGuid} className={styles.equipment}>
                        <div className={styles.title}>{tg.equipmentName}</div>
                        <div className={styles.cards}>
                            {tg.tests?.map(c => 
                                <div key={c.guid} className={styles.card}>
                                    <input 
                                        onChange={(e) => {
                                            if(e.target.checked) decarator(() => tests.current.push({testDescriptionId: e.target.value, testsGroupId: tg.equipmentGuid}))
                                            else decarator(() => tests.current = tests.current.filter(t => t.testDescriptionId !== e.target.value))
                                        }} 
                                        value={c.testDescriptionGuid} 
                                        type="checkbox" 
                                        className={styles.click}
                                    />
                                    <div className={styles.title}>{c.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.inline}>
                {!isLoadingUsers &&                   
                    <div className={styles.tester}>
                        <div className={styles.title}>Отвественный исполнитель:</div>
                        {!isLoadingUsers && 
                            <select onChange={(e) => decarator(() => executorId.current = e.target.value)} className={styles.executors} name="executors" id="executor-select">
                                <option value="">--Please choose an option--</option>
                                {users.map(ud => 
                                    <option key={ud.guid} value={ud.guid}>
                                        {ud.firstName}&nbsp;{ud.lastName}
                                    </option>
                                )}
                            </select>
                        }
                    </div>
                }
                <div className={styles.deadline}>
                    <div className={styles.title}>Срок завершения:</div>
                    <input onChange={(e) => decarator(() => deadline.current = new Date(e.target.value))} type="date" className={styles.date}></input>
                </div>
            </div>
            <div className={styles.inline}>
                <button onClick={() => setOpenSendAwaitDeviceWindow(true)} disabled={isNotValidForm} className={styles.accept}>Отправить на согласование</button>
            </div>
        </div>
    )
}