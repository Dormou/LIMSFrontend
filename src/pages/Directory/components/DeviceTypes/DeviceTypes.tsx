import { useRef, useState } from 'react'

import { EditDeviceTypeForm } from './components/EditDeviceTypeFrom/EditDeviceTypeForm'
import { useDropDeviceTypeMutation } from '../../../../connect/deviceTypeApi/deviceTypeApi'
import { DeviceType } from '../../../../connect/deviceTypeApi/Types'

import editIcon from '../../../../source/images/icons/editIcon.svg'
import dropIcon from '../../../../source/images/icons/dropIcon.svg'

import styles from './DeviceTypes.module.scss'

interface propsDeviceTypes {
    deviceTypes: DeviceType[]
    save: (deviceType: DeviceType) => void
    update: (deviceType: DeviceType) => void
    dropSave: (id: string) => void
}

type EditDeviceType = {
    name: string
    description: string
}

export const DeviceTypes = (props: propsDeviceTypes) => {
    const [dropDeviceType] = useDropDeviceTypeMutation()

    const [editGuid, setEditGuid] = useState('')
    const [dropGuid, setDropGuid] = useState('')
    
    const editData = useRef({} as EditDeviceType)

    const close = () => setEditGuid('')

    const drop = async (id: string) => {
        const res = await dropDeviceType(id)

        if(res['error']) alert('Тест не удален')
        else{
            props.dropSave(id)

            setDropGuid('')
        }
    }

    const onEdit = (guid: string, data: EditDeviceType) => {
        editData.current = data
        console.log(guid)
        setEditGuid(guid)
    }

    return (
        <>
            {dropGuid && 
                <div className={styles.dropWindow}>
                    <div className={styles.title}>Удаление устройства</div>
                    <div className={styles.description}>
                        Устройство будет удален, Вы уверны? 
                    </div>
                    <div className={styles.buttons}>
                        <div onClick={() => setDropGuid('')} className={styles.reject}>Отменить</div>
                        <div onClick={() => drop(dropGuid)} className={styles.accept}>Удалить</div>
                    </div>
                </div>
            }
            {editGuid && 
                <EditDeviceTypeForm 
                    guid={editGuid} 
                    name={editData.current.name}
                    description={editData.current.description}
                    update={props.update} 
                    close={close}
                />
            }
            <div className={styles.main}>
                <div className={styles.titles}>
                    <div className={styles.title}>
                        <div className={styles.name}>Наименование устройства</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.description}>Описание</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.date}>Дата последнего изменения</div>
                    </div>
                    <div className={styles.title}>
                            <div className={styles.actions}>Действия</div>
                    </div>
                </div>
                <div className={styles.items}>
                    <div className={styles.content}>
                        {props.deviceTypes.map(e =>                
                                <div key={e.guid} className={styles.item}>
                                    <div className={styles.name}>{e.name}</div>
                                    <div className={styles.description}>{e.description}</div>
                                    <div className={styles.date}>{new Date(e.dateOfCreation).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                                    <div className={styles.actions}>
                                        <div onClick={() => onEdit(e.guid, {name: e.name, description: e.description})} className={styles.edit}>
                                            <img className={styles.icon} src={editIcon} alt={'edit'}/>
                                        </div>
                                        <div onClick={() => setDropGuid(e.guid)} className={styles.drop}>
                                            <img className={styles.icon} src={dropIcon} alt={'drop'}/>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}