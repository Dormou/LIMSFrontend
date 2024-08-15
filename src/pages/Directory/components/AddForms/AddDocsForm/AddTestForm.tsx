import { useRef, useState } from 'react'

import { useAddTestDescriptionMutation } from '../../../../../connect/testDescryptionsApi/testDescriptionsApi'
import { useFetchEquipmentsQuery } from '../../../../../connect/equipmentsApi/equipmentsApi'
import { TestDescription } from '../../../../../connect/testDescryptionsApi/Types'

import { ModalWindow } from '../../../../components/ModalWindow/ModalWinow'

import plusIcon from '../../../../../source/images/icons/ant-design_plus-outlined.svg'
import dropdownIcon from '../../../../../source/images/icons/dropdown.svg'

import styles from './AddTestForm.module.scss'

interface propsAddTestForm {
    close: () => void
    save: (test: TestDescription) => void
}

export const AddTestForm = (props: propsAddTestForm) => {
    const {isLoading: isLoadingEquipments, data: dataEquipments} = useFetchEquipmentsQuery({limit: 150, numberSkip: 0})
    const [addTest] = useAddTestDescriptionMutation()

    const [choseEquipmentId, setchoseEquipmentId] = useState('')
    const [openDropdownTypeDevices, setOpenDropdownTypeDevices] = useState(false)
    const [disabledAccept, setDisabledAccept] = useState(true)


    const _name = useRef('')
    const _description = useRef('')

    const varificationDecorator = (callback: () => void) => {
        callback()

        if(
            _name.current.length > 0 &&
            _description.current.length > 0 &&
            choseEquipmentId.length > 0
        ) setDisabledAccept(false)
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Add = async () => {
        try {
            const res = await addTest({
                name: _name.current,
                description: _description.current,
                equipmentGuid: choseEquipmentId
            }).unwrap()

            const equipmentName = dataEquipments? dataEquipments.find(de => de.guid === choseEquipmentId)?.name: undefined

            if(res) {
                console.log(res)
                props.save({
                    ...res,
                    equipmentName: equipmentName? equipmentName: '',
                    equipmentGuid: res.equipmentGuid
                }) 
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
                        <div className={styles.title}>Новый тест</div>
                        <div className={styles.field}>
                            <div className={styles.title}>Наименование теста</div>
                            <input onChange={(e) => varificationDecorator(() => _name.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.fieldDropdown}>
                            <div className={styles.title}>Оборудование для проведения</div>
                            <div className={styles.header}>
                                {dataEquipments.filter(dt => dt.guid === choseEquipmentId).map(dt => 
                                    <div key={dt.guid} className={styles.testsGroup}>
                                        <div className={styles.name}>{dt.name}</div>
                                        <img onClick={() => varificationDecorator(() => setchoseEquipmentId(''))} className={styles.remove} src={plusIcon} alt={"Х"}/>
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
                                                varificationDecorator(() => setchoseEquipmentId(dt.guid))
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