import { useRef, useState } from 'react'

import { useFetchDeviceTypesQuery, useAddDeviceTypeMutation } from '../../../../../connect/deviceTypeApi/deviceTypeApi'
import { DeviceType } from '../../../../../connect/deviceTypeApi/Types'

import { ModalWindow } from '../../../../components/ModalWindow/ModalWinow'

import styles from './AddDeviceTypeForm.module.scss'

interface propsAddDeviceTypeForm {
    close: () => void
    save: (test: DeviceType) => void
}

export const AddDeviceTypeForm = (props: propsAddDeviceTypeForm) => {
    const {isLoading: isLoadingEquipments, data: dataEquipments} = useFetchDeviceTypesQuery({limit: 150, numberSkip: 0})
    const [AddDeviceType] = useAddDeviceTypeMutation()

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
            const res = await AddDeviceType({
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
                        <div className={styles.title}>Новое устройство</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование устройства</div>
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