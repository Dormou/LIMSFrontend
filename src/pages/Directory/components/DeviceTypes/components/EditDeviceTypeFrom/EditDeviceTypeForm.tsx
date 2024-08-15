import { useRef, useState } from 'react'

import { useUpdateDeviceTypeMutation } from '../../../../../../connect/deviceTypeApi/deviceTypeApi'
import { useFetchDeviceTypesQuery } from '../../../../../../connect/deviceTypeApi/deviceTypeApi'
import { DeviceType } from '../../../../../../connect/deviceTypeApi/Types'

import { ModalWindow } from '../../../../../components/ModalWindow/ModalWinow'

import styles from './EditDeviceTypeForm.module.scss'

interface propsEditDeviceTypeForm {
    guid: string
    name: string
    description: string
    close: () => void
    update: (test: DeviceType) => void
}

export const EditDeviceTypeForm = (props: propsEditDeviceTypeForm) => {
    const {isLoading: isLoadingDeviceTypes, data: dataDeviceTypes} = useFetchDeviceTypesQuery({limit: 150, numberSkip: 0})
    const [EditDeviceType] = useUpdateDeviceTypeMutation()

    const [disabledAccept, setDisabledAccept] = useState(true)

    const _name = useRef(props.name)
    const _description = useRef(props.description)

    const varificationDecorator = (callback: () => void) => {
        callback()

        if(
            _name.current !== props.name ||
            _description.current !== props.description
        ) setDisabledAccept(false)
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Edit = async () => {
        try {
            const res = await EditDeviceType({
                guid: props.guid,
                name: _name.current,
                description: _description.current,
            }).unwrap()

            if(res) {
                props.update(res)

                props.close()
            }
            else alert("заявка не отправлена!") 

        } catch {
            alert("заявка не отправлена!") 
        }
    }

    return (
        <>
        {!isLoadingDeviceTypes && dataDeviceTypes &&
            <ModalWindow
                slot={
                    <div className={styles.main}>
                        <div className={styles.title}>Редактировать тип устройства</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование типа устройства</div>
                            <input defaultValue={_name.current} onChange={(e) => varificationDecorator(() => _name.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.title}>Описание</div>
                            <input defaultValue={_description.current} onChange={(e) => varificationDecorator(() => _description.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={props.close} className={styles.cencel}>Отмена</button>
                            <button onClick={Edit} disabled={disabledAccept} className={styles.accept}>Принять</button>
                        </div>
                    </div>
                }
            />
        }
        </>
    )
}