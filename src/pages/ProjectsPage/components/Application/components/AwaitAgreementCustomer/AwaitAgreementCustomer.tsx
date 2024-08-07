import { useEffect, useRef, useState } from "react"

import { Executor } from "../../../../../../connect/projectsApi/Types"
import { TestGroup } from "../../../../../../connect/applicationsApi/Types"
import { useFetchInternalUsersQuery } from "../../../../../../connect/userApi/userApi"
import { FetchInternalUsersResponse } from "../../../../../../connect/userApi/Responses"

import { useChangeCurrentStatusMutation, useUpdateProjectMutation } from "../../../../../../connect/projectsApi/projectsApi"

import plusIcon from "../../../../../../source/images/icons/ant-design_plus-outlined.svg"

import styles from "./AwaitAgreementCustomer.module.scss"

interface propsAwaitAgreementCustomer {
    projectId: string
    testGroups: TestGroup[]
}

export const AwaitAgreementCustomer = (props: propsAwaitAgreementCustomer) => {

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
            <div className={styles.docs}>
                <div className={styles.title}>Документы ля согласования:</div>
                <div className={styles.value}>Документов нет</div>
            </div>
        </div>
    )
}