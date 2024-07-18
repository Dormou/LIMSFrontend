import { Card } from "../../../../../../connect/projectsApi/Types"

import styles from "./Agreement.module.scss"

interface propsAgreement {
    cards: Card[]
}

type Equipment = {
    id: string
    name: string
    cards: Card[]
}

export const Agreement = (props: propsAgreement) => {
    const equipments : Equipment[] = props.cards
    .map(c => c.equipment.id)
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .map(eId => {
        return {
            id: eId,
            name: props.cards.find(c => c.equipment.id === eId)?.equipment.name,
            cards: props.cards.filter(card => card.equipment.id === eId)
        } as Equipment
    })

    return (
        <div className={styles.main}>
            <div className={styles.equipments}>
                {equipments.map(e => 
                    <div className={styles.equipment}>
                        <div className={styles.title}>{e.name}</div>
                        <div className={styles.cards}>
                            {e.cards.map(c => 
                                <div className={styles.card}>
                                    <input type="checkbox" className={styles.click}></input>
                                    <div className={styles.title}>{c.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}