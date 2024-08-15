import { useRef, useState } from 'react'

import { TestDescription } from '../../../../connect/testDescryptionsApi/Types'
import { EditTestForm } from './components/EditTestFrom/EditTestForm'

import editIcon from '../../../../source/images/icons/editIcon.svg'
import dropIcon from '../../../../source/images/icons/dropIcon.svg'

import styles from './Tests.module.scss'
import { useDropTestDescriptionMutation } from '../../../../connect/testDescryptionsApi/testDescriptionsApi'

interface propsTests {
    testDescs: TestDescription[]
    save: (test: TestDescription) => void
    update: (test: TestDescription) => void
    dropSave: (id: string) => void
}

type EditTest = {
    name: string
    description: string
    equipmentId: string
}

export const Tests = (props: propsTests) => {
    const [dropTest] = useDropTestDescriptionMutation()

    const [editGuid, setEditGuid] = useState('')
    const [dropGuid, setDropGuid] = useState('')

    const editData = useRef({} as EditTest)

    const close = () => setEditGuid('')

    const drop = async (id: string) => {
        const res = await dropTest(id)

        if(res['error']) alert('Тест не удален')
        else{
            props.dropSave(id)

            setDropGuid('')
        }
    }

    const onEdit = (id: string, data: EditTest) => {
        editData.current = data

        setEditGuid(id)
    }

    return (
        <>
            {dropGuid && 
                <div className={styles.dropWindow}>
                    <div className={styles.title}>Удаление теста</div>
                    <div className={styles.description}>
                        Тест будет удален, Вы уверны? 
                    </div>
                    <div className={styles.buttons}>
                        <div onClick={() => setDropGuid('')} className={styles.reject}>Отменить</div>
                        <div onClick={() => drop(dropGuid)} className={styles.accept}>Удалить</div>
                    </div>
                </div>
            }
            {editGuid && 
                <EditTestForm 
                    guid={editGuid} 
                    name={editData.current.name}
                    description={editData.current.description}
                    choseEquipmentId={editData.current.equipmentId}
                    update={props.update}
                    close={close}
                />}
            <div className={styles.main}>
                <div className={styles.titles}>
                    <div className={styles.title}>
                        <div className={styles.name}>Наименование теста</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.descryption}>Описание</div>
                    </div>
                    <div className={styles.title}>
                        <div className={styles.equipment}>Оборудование для проведения</div>
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
                        {props.testDescs.map(t =>                
                                <div key={t.guid} className={styles.item}>
                                    <div className={styles.name}>{t.name}</div>
                                    <div className={styles.descryption}>{t.description}</div>
                                    <div className={styles.equipment}>{t.equipmentName}</div>
                                    <div className={styles.date}>{new Date(t.dateOfCreation).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}</div>
                                    <div className={styles.actions}>
                                        <div onClick={() => onEdit(t.guid, {name: t.name, description: t.description, equipmentId: t.equipmentGuid})} className={styles.edit}>
                                            <img className={styles.icon} src={editIcon} alt={'edit'}/>
                                        </div>
                                        <div onClick={() => setDropGuid(t.guid)} className={styles.drop}>
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