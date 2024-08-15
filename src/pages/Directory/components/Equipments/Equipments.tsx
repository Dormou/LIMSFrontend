import { useRef, useState } from 'react'

import { EditEquipmentForm } from './components/EditEquipmentFrom/EditEquipmentForm'
import { useDropEquipmentMutation } from '../../../../connect/equipmentsApi/equipmentsApi'
import { Equipment } from '../../../../connect/equipmentsApi/Types'

import editIcon from '../../../../source/images/icons/editIcon.svg'
import dropIcon from '../../../../source/images/icons/dropIcon.svg'

import styles from './Equipments.module.scss'

interface propsEquipments {
    equipments: Equipment[]
    save: (test: Equipment) => void
    update: (test: Equipment) => void
    dropSave: (id: string) => void
}

type EditEquipment = {
    name: string
    description: string
}

export const Equipments = (props: propsEquipments) => {
    const [dropEquipment] = useDropEquipmentMutation()

    const [editGuid, setEditGuid] = useState('')
    const [dropGuid, setDropGuid] = useState('')
    
    const editData = useRef({} as EditEquipment)

    const close = () => setEditGuid('')

    const drop = async (id: string) => {
        const res = await dropEquipment(id)

        if(res['error']) alert('Тест не удален')
        else{
            props.dropSave(id)

            setDropGuid('')
        }
    }

    const onEdit = (guid: string, data: EditEquipment) => {
        editData.current = data
        console.log(guid)
        setEditGuid(guid)
    }

    return (
        <>
            {dropGuid && 
                <div className={styles.dropWindow}>
                    <div className={styles.title}>Удаление обрудования</div>
                    <div className={styles.description}>
                        Обрудование будет удалено, Вы уверны? 
                    </div>
                    <div className={styles.buttons}>
                        <div onClick={() => setDropGuid('')} className={styles.reject}>Отменить</div>
                        <div onClick={() => drop(dropGuid)} className={styles.accept}>Удалить</div>
                    </div>
                </div>
            }
            {editGuid && 
                <EditEquipmentForm 
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
                        <div className={styles.name}>Наименование обрудования</div>
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
                        {props.equipments.map(e =>                
                                <div className={styles.item}>
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