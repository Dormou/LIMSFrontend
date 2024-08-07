import { useEffect, useRef, useState } from "react"

import { Executor, TestGroup } from "../../../../../../connect/projectsApi/Types"
import { useFetchInternalUsersQuery } from "../../../../../../connect/userApi/userApi"
import { FetchInternalUsersResponse } from "../../../../../../connect/userApi/Responses"

import { useChangeCurrentStatusMutation, useUpdateProjectMutation } from "../../../../../../connect/projectsApi/projectsApi"

import plusIcon from "../../../../../../source/images/icons/ant-design_plus-outlined.svg"

import styles from "./Done.module.scss"

interface propsDone {
    projectId: string
    dutRegistrationData: string
    testGroups: TestGroup[]
    executor: Executor
    deadline: Date
}

type Users = FetchInternalUsersResponse

type Test = {
    testDescriptionId: string, 
    testsGroupId: string
}

export const Done = (props: propsDone) => {

    return (
        <div className={styles.main}>
            <div className={styles.testGroupsContainer}>
                <div className={styles.title}>Оборудование для проведения испытаний:</div>
                <div className={styles.testGroups}>
                    {props.testGroups.map(tg => 
                        <div key={tg.equipmentGuid} className={styles.testGroup}>
                            <div className={styles.name}>{tg.equipmentName}</div>
                            <div className={styles.tests}>
                                {tg.tests?.map(t => 
                                    <div key={t.guid} className={styles.test}>
                                        <div className={styles.title}>{t.name}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.inline}>
                <div className={styles.tester}>
                    <div className={styles.title}>Отвественный исполнитель:</div>
                    <div className={styles.executor}>
                        &nbsp;{props.executor.firstName}
                        &nbsp;{props.executor.secondName}
                        &nbsp;{props.executor.lastName}
                    </div>
                </div>
                <div className={styles.deadline}>
                    <div className={styles.title}>Срок завершения:</div>
                    <div className={styles.date}>{props.deadline.toLocaleString()}</div>
                </div>
            </div>
            <div className={styles.docs}>
                <div className={styles.title}>Документы ля согласования:</div>
                <div className={styles.value}>Документов нет</div>
            </div>
        </div>
    )
}