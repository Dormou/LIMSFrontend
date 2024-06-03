import { StatusTest } from '../../../../connect/projectsApi/Types'
import actionsIcon from '../../../../source/images/icons/actions.svg'

import styles from './Project.module.scss'

type Expert = {
    name: string
    datePinnded: Date
}

type Test = {
    name: string
    accept: StatusTest
}

interface propsCard {
    name: string
    mandatoryTests: Test[]
    nonMandatoryTests: Test[]
    expert: Expert
    deadline: Date
}

export const Card = (props: propsCard) => {

    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <div className={styles.title}>
                    <div className={styles.name}>{props.name}</div> 
                    <div className={styles.actions}>
                        <img src={actionsIcon} alt={'actionsIcon'}/>
                    </div> 
                </div>
                <div className={styles.icons}></div>
                <div className={styles.mandatoryTests}>
                    <div className={styles.title}>Обязательные тесты</div>
                    <div className={styles.count}>{props.mandatoryTests.length}</div>
                </div>
                <div className={styles.nonMandatoryTests}>
                    <div className={styles.title}>Условные тесты</div>
                    <div className={styles.count}>{props.nonMandatoryTests.length}</div>
                </div>
                <div className={styles.expert}>
                    <div className={styles.name}>{expect.name}</div>
                    <div className={styles.datePinned}>{props.expert.datePinnded.toString()}</div>
                </div>
                <div className={styles.deadline}>{props.deadline.toString()}</div>
            </div>
        </div>
    )
}