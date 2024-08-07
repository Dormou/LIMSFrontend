import styles from './Input.module.scss'

interface propsInput {
    styles?: {value: string, margeStyles: boolean}
    value?: string
    placeholder: string
    onChange: (v: any) => void 
}

export const Input = (props: propsInput) => {
    
    return (
        <div className={props.styles? props.styles.margeStyles? props.styles.value + styles.main: styles.main: styles.main}>
            <input value={props.value} onChange={(v) => props.onChange(v)} placeholder={props.placeholder}></input>
        </div>
    )
}