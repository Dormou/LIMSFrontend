import { useRef, useState } from 'react'

import { useUpdateTestDescriptionMutation } from '../../../../../../connect/testDescryptionsApi/testDescriptionsApi'
import { useFetchEquipmentsQuery } from '../../../../../../connect/equipmentsApi/equipmentsApi'
import { TestDescription } from '../../../../../../connect/testDescryptionsApi/Types'

import { ModalWindow } from '../../../../../components/ModalWindow/ModalWinow'

import plusIcon from '../../../../../../source/images/icons/ant-design_plus-outlined.svg'
import dropdownIcon from '../../../../../../source/images/icons/dropdown.svg'

import styles from './EditTestForm.module.scss'

interface propsEditTestForm {
    guid: string
    name: string
    description: string
    choseEquipmentId: string
    close: () => void
    update: (test: TestDescription) => void
}

export const EditTestForm = (props: propsEditTestForm) => {
    const {isLoading: isLoadingEquipments, data: dataEquipments} = useFetchEquipmentsQuery({limit: 150, numberSkip: 0})
    const [EditTest] = useUpdateTestDescriptionMutation()
console.log(props.name)
    const [choseEquipmentId, setChoseEquipmentId] = useState(props.choseEquipmentId)
    const [openDropdownTypeDevices, setOpenDropdownTypeDevices] = useState(false)
    const [disabledAccept, setDisabledAccept] = useState(true)

    const _name = useRef(props.name)
    const _description = useRef(props.description)

    const validationDecorator = (callback: () => void) => {
        callback()

        if(
            _name.current !== props.name ||
            _description.current !== props.description ||
            choseEquipmentId !== props.choseEquipmentId 
        ) setDisabledAccept(false)
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Edit = async () => {
        try {
            const res = await EditTest({
                guid: props.guid,
                name: _name.current,
                description: _description.current,
                equipmentGuid: choseEquipmentId
            }).unwrap()

            const equipmentName = dataEquipments? dataEquipments.find(de => de.guid === choseEquipmentId)?.name: undefined

            if(res) props.update({
                ...res,
                name: _name.current,
                description: _description.current,
                equipmentGuid: choseEquipmentId,
                equipmentName: equipmentName? equipmentName: '',
            })
            else alert("заявка не отправлена!") 

            props.close()

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
                        <div className={styles.title}>Редактировать тест</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование теста</div>
                            <input defaultValue={_name.current} onChange={(e) => validationDecorator(() => _name.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.fieldDropdown}>
                            <div className={styles.title}>Оборудование для проведения</div>
                            <div className={styles.header}>
                                {dataEquipments.filter(dt => dt.guid === choseEquipmentId).map(dt => 
                                    <div key={dt.guid} className={styles.testsGroup}>
                                        <div className={styles.name}>{dt.name}</div>
                                        <img onClick={() => validationDecorator(() => setChoseEquipmentId(''))} className={styles.remove} src={plusIcon} alt={"Х"}/>
                                    </div>
                                )}
                                <div onClick={() => setOpenDropdownTypeDevices(!openDropdownTypeDevices)} className={styles.open}>
                                    <img src={dropdownIcon} className={styles.icon} alt={'+'}/>
                                </div>
                            </div>
                            {openDropdownTypeDevices && 
                                <div className={styles.items}>
                                    {dataEquipments.filter(dt => dt.guid !== choseEquipmentId).map(dt => 
                                        <div 
                                            key={dt.guid} 
                                            onClick={() => {
                                                validationDecorator(() => setChoseEquipmentId(dt.guid))
                                                setOpenDropdownTypeDevices(false)
                                            }} 
                                            className={styles.name}
                                        >
                                            {dt.name}
                                        </div>
                                    )}                              
                                </div>
                            }
                        </div>
                        <div className={styles.field}>
                            <div className={styles.title}>Описание</div>
                            <input defaultValue={_description.current} onChange={(e) => validationDecorator(() => _description.current = e.target.value)} className={styles.value}></input>
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