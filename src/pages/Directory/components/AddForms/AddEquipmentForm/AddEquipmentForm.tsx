import { useRef, useState } from 'react'

import { useFetchEquipmentsQuery, useAddEquipmentMutation } from '../../../../../connect/equipmentsApi/equipmentsApi'
import { Equipment } from '../../../../../connect/equipmentsApi/Types'

import { ModalWindow } from '../../../../components/ModalWindow/ModalWinow'

import styles from './AddEquipmentForm.module.scss'

interface propsAddEquipmentForm {
    close: () => void
    save: (test: Equipment) => void
}

export const AddEquipmentForm = (props: propsAddEquipmentForm) => {
    const {isLoading: isLoadingEquipments, data: dataEquipments} = useFetchEquipmentsQuery({limit: 150, numberSkip: 0})
    const [AddEquipment] = useAddEquipmentMutation()

    const [disabledAccept, setDisabledAccept] = useState(true)

    const _name = useRef('')
    const _description = useRef('')

    const varificationDecorator = (callback: () => void) => {
        callback()

        if(
            _name.current.length > 0 &&
            _description.current.length > 0
        ) setDisabledAccept(false)
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Add = async () => {
        try {
            const res = await AddEquipment({
                name: _name.current,
                description: _description.current,
            }).unwrap()

            if(res) {
                props.save(res) 
                
                props.close()
            }
            else alert("заявка не отправлена!") 

        } catch {
            alert("заявка не отправлена!") 
        }



    }

    return (
        <>
        {!isLoadingEquipments && dataEquipments &&
            <ModalWindow
                slot={
                    <div className={styles.main}>
                        <div className={styles.title}>Новое обрудование</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование обрудования</div>
                            <input onChange={(e) => varificationDecorator(() => _name.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.title}>Описание</div>
                            <input onChange={(e) => varificationDecorator(() => _description.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={props.close} className={styles.cencel}>Отмена</button>
                            <button onClick={Add} disabled={disabledAccept} className={styles.accept}>Принять</button>
                        </div>
                    </div>
                }
            />
        }
        </>
    )
}