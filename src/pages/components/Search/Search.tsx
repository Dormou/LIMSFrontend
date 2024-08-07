import styles from './Search.module.scss'

import SearchIcon from '../../../source/images/icons/search.svg'

interface propsSearch {
    callback: (v: string) => void
}

export const Search = (props: propsSearch) => {

    return (
        <div className={styles.main}>
            <div className={styles.label}>
                <input onChange={(v) => props.callback(v.target.value)}></input>
            </div>
        </div>
    )
}