import { useRef, useState } from 'react'

import { useUpdateEquipmentMutation } from '../../../../../../connect/equipmentsApi/equipmentsApi'
import { useFetchEquipmentsQuery } from '../../../../../../connect/equipmentsApi/equipmentsApi'
import { Equipment } from '../../../../../../connect/equipmentsApi/Types'

import { ModalWindow } from '../../../../../components/ModalWindow/ModalWinow'

import plusIcon from '../../../../../../source/images/icons/ant-design_plus-outlined.svg'
import dropdownIcon from '../../../../../../source/images/icons/dropdown.svg'

import styles from './EditEquipmentForm.module.scss'

interface propsEditEquipmentForm {
    guid: string
    name: string
    description: string
    close: () => void
    update: (test: Equipment) => void
}

export const EditEquipmentForm = (props: propsEditEquipmentForm) => {
    const {isLoading: isLoadingEquipments, data: dataEquipments} = useFetchEquipmentsQuery({limit: 150, numberSkip: 0})
    const [EditEquipment] = useUpdateEquipmentMutation()

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
            const res = await EditEquipment({
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
        {!isLoadingEquipments && dataEquipments &&
            <ModalWindow
                slot={
                    <div className={styles.main}>
                        <div className={styles.title}>Редактировать оборудование</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование оборудования</div>
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