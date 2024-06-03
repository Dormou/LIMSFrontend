import { SetStateAction, useEffect, useRef, useState } from 'react'
import dStyles from './Filter.module.scss'

type Filter<Item> = {
    name: string
    filter: (items?: Item[]) => void
}

interface propsSearch<Item> {
    styles?: {[key: string]: string}
    filterAfterSelected: boolean
    items: Item[]
    filters: Filter<Item>[]
}

export function Filter<Item>(props: propsSearch<Item>) {
    const styles = props.styles? props.styles: dStyles

    const [actualFilter, setActualFilter] = useState(props.filters[0])
    const [open, setOpen] = useState(false)

    useEffect(() => void(actualFilter.filter(props.items)), [props.filterAfterSelected? actualFilter: undefined])

    return (
        <div className={styles.main}>
            <div tabIndex={open? 0: -1} className={styles.title} onClick={() => setOpen(!open)}>Выберите фильтр</div>
            {!props.filterAfterSelected && 
                <div onClick={() => actualFilter.filter(props.items)} className={styles.filterButton}></div>
            }
            {open &&
                <div className={styles.filters}>
                    {props.filters.map(f => 
                        <div onClick={() => setActualFilter(f)} className={styles.filter}>{f.name}</div>
                    )}   
                </div>
            }
        </div>
    )
}
