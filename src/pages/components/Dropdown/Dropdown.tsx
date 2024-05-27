import dStyles from './Dropdown.module.scss'

type Item = {
    id?: string
    title: string
    body: any
}

interface propsDropdown {
    items: Item[]
    styles?: {[key: string]: string}
}

export const Dropdown = (props: propsDropdown) => {
    const styles = props.styles? props.styles: dStyles

    return (
        <div className={styles.main}>
            <div className={styles.items}>
                {props.items.map((item, i) => 
                    <div className={styles.item}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.data}>{item.body}</div>
                    </div>
                )}
            </div>
        </div>
    )
}