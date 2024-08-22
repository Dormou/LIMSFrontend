import { useRef, useState } from 'react'

import { Application, TestGroup } from '../../../../../../../../connect/applicationsApi/Types'
import { useChangeCurrentStatusMutation, useUpdateApplicationMutation } from '../../../../../../../../connect/applicationsApi/applicationsApi'
import { useFetchDeviceTypesQuery } from '../../../../../../../../connect/deviceTypeApi/deviceTypeApi'

import { ModalWindow } from '../../../../../../../components/ModalWindow/ModalWinow'

import plusIcon from '../../../../../../../../source/images/icons/ant-design_plus-outlined.svg'
import dropdownIcon from '../../../../../../../../source/images/icons/dropdown.svg'

import styles from './EditApplicationForm.module.scss'


interface propsEditApplicationForm {
    testsGroups: TestGroup[]
    applicationGuid: string
    deviceTypeId: string
    comment: string
    deviceModel: string
    close: () => void
    save: (application: Application) => void
}

type Test = {
    testId: string
    tgId: string
}

export const EditApplicationForm = (props: propsEditApplicationForm) => {
    const {isLoading: isLoadingDeviceTypes, data: dataDeviceTypes} = useFetchDeviceTypesQuery({limit: 50, numberSkip: 0})
    const [updateApplication] = useUpdateApplicationMutation()
    const [updateStatusApplication] = useChangeCurrentStatusMutation()


    const [choseTestsGroupsIds, setChoseTestsGroupsIds] = useState(props.testsGroups.map(tg => tg.equipmentGuid))
    const [chosegDeviceTypeId, setChosegDeviceTypeId] = useState(props.deviceTypeId)
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openDropdownTypeDevices, setOpenDropdownTypeDevices] = useState(false)
    const [disabledAccept, setDisabledAccept] = useState(true)

    const initTestsIds = props.testsGroups.map(tg => tg.tests? tg.tests.map(t => { return {testId: t.guid, tgId: tg.equipmentGuid} as Test}): {} as Test).flat()

    const _comment = useRef(props.comment)
    const _deviceModel = useRef(props.deviceModel)
    const _testsIds = useRef(initTestsIds)

    const varificationDecorator = (callback?: () => void) => {
        if(callback) callback()

        if(
            _comment.current !== props.comment ||
            _deviceModel.current !== props.deviceModel ||
            chosegDeviceTypeId !== props.deviceTypeId ||
            !initTestsIds.every(t => _testsIds.current.find(it => it.testId === t.testId))

        ) setDisabledAccept(false)
       
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Update = async () => {
        try {
            const res = await updateApplication({
                guid: props.applicationGuid,
                deviceModel: _deviceModel.current,
                deviceTypeGuid: chosegDeviceTypeId,
                comment: _comment.current,
                TestGuids: _testsIds.current.map(t => t.testId),
            }).unwrap()

            if(res) {
                props.save(res) 

                const resStatus = await updateStatusApplication({
                    applicationGuid: props.applicationGuid,
                    statusDescriptionName: 'Preparation',
                    message: _comment.current
                })

                if(resStatus['error']) alert("заявка не обновлена!")       
            }
            else alert("заявка не обновлена!") 


        } catch {
            alert("заявка не обновлена!") 
        }
    }

    return (
        <>
            <ModalWindow
                slot={
                    <div className={styles.main}>
                        <div className={styles.inline}>
                        {!isLoadingDeviceTypes && dataDeviceTypes &&
                            <div className={styles.dropdownDeviceTypeConteiner}>
                                <div className={styles.title}>Тип устройства</div>
                                <div className={styles.dropdownDeviceType}>
                                    <div className={styles.header}>
                                        {dataDeviceTypes.filter(dt => dt.guid === chosegDeviceTypeId).map(dt => 
                                            <div key={dt.guid} className={styles.testsGroup}>
                                                <div className={styles.name}>{dt.name}</div>
                                                <img onClick={() => varificationDecorator(() => setChosegDeviceTypeId(''))} className={styles.remove} src={plusIcon} alt={"Х"}/>
                                            </div>
                                        )}
                                        <div onClick={() => setOpenDropdownTypeDevices(!openDropdownTypeDevices)} className={styles.open}>
                                            <img src={dropdownIcon} className={styles.icon} alt={'+'}/>
                                        </div>                                    
                                    </div>
                                    {openDropdownTypeDevices && 
                                        <div className={styles.items}>
                                            {dataDeviceTypes.filter(dt => dt.guid !== chosegDeviceTypeId).map(dt => 
                                                <div 
                                                    key={dt.guid} 
                                                    onClick={() => {
                                                        varificationDecorator(() => setChosegDeviceTypeId(dt.guid))
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
                            </div>
                        }
                            <div className={styles.modelName}>
                                <div className={styles.title}>Модель устройства</div>
                                <input defaultValue={props.deviceModel} id={"modelName"} onChange={(e) => varificationDecorator(() => _deviceModel.current = e.target.value)} className={styles.value}></input>
                            </div>
                        </div>
                        <div className={styles.dropdownTestsGroupsConteiner}>
                            <div className={styles.title}>Оборудование для проведения испытаний</div>
                            <div className={styles.dropdownTestsGroups}>
                                <div className={styles.header}>
                                    {props.testsGroups.filter(tg => undefined !== choseTestsGroupsIds.find(tgid => tgid === tg.equipmentGuid)).map(tg => 
                                        <div key={tg.equipmentGuid} className={styles.testsGroup}>
                                            <div className={styles.name}>{tg.equipmentName}</div>
                                            <img 
                                                onClick={() => {
                                                    const lChoseTestsGroupsIds = [...choseTestsGroupsIds.filter(tgid => tgid !== tg.equipmentGuid)]

                                                    _testsIds.current = _testsIds.current.filter(t => lChoseTestsGroupsIds.find(tgid => tgid === t.tgId))

                                                    varificationDecorator(() => setChoseTestsGroupsIds(lChoseTestsGroupsIds))
                                                }} 
                                                className={styles.remove} 
                                                src={plusIcon} 
                                                alt={"Х"}
                                            />
                                        </div>
                                    )}
                                        <div onClick={() => setOpenDropdownTypeDevices(!openDropdownTypeDevices)} className={styles.open}>
                                            <img src={dropdownIcon} className={styles.icon} alt={'+'}/>
                                        </div>    
                                    </div>
                                {openDropdown && 
                                    <div className={styles.items}>
                                        {props.testsGroups.filter(tg => undefined === choseTestsGroupsIds.find(tgid => tgid === tg.equipmentGuid)).map(tg => 
                                            <div key={tg.equipmentGuid} className={styles.item}>
                                                <div 
                                                    key={tg.equipmentGuid} 
                                                    onClick={() => {
                                                        const lChoseTestsGroupsIds = [...choseTestsGroupsIds.concat(tg.equipmentGuid)]
    
                                                        _testsIds.current = initTestsIds.filter(t => lChoseTestsGroupsIds.find(tgid => tgid === t.tgId))

                                                        varificationDecorator(() => setChoseTestsGroupsIds(lChoseTestsGroupsIds))
                                                    }} 
                                                    className={styles.name}
                                                >
                                                    {tg.equipmentName}
                                                </div>
                                            </div>
                                        )}                              
                                    </div>
                                }
                            </div>
                        </div>

                        <div className={styles.testsGroups}>
                            {props.testsGroups.filter(tg => undefined !== choseTestsGroupsIds.find(tgid => tgid === tg.equipmentGuid)).map((tg, tgI) => 
                                <div key={tg.equipmentGuid} className={styles.testsGroup}>
                                    <div className={styles.name}>{tg.equipmentName}</div>
                                    <div className={styles.tests}>
                                        {tg.tests.map((t, i) => 
                                            <div key={t.guid} className={styles.test}>
                                                <input 
                                                    id={"checkbox"}
                                                    defaultChecked={true}
                                                    onChange={(e) => {
                                                        if(e.target.checked) varificationDecorator(() => _testsIds.current.push({testId: t.guid, tgId: tg.equipmentGuid}))
                                                        else varificationDecorator(() => _testsIds.current = _testsIds.current.filter(tid => tid.testId !== e.target.value))
                                                    }}
                                                    type={"checkbox"} className={styles.checkbox}
                                                    value={t.guid} 
                                                >       
                                                </input>
                                                <div className={styles.name}>{t.name}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={styles.files}>
                            <div className={styles.title}>Файлы</div>
                            <input className={styles.value}></input>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.title}>Комментарии</div>
                            <input defaultValue={props.comment} id={"comment"} onChange={(e) => varificationDecorator(() => _comment.current = e.target.value)} className={styles.value}></input>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={props.close} className={styles.cencel}>Отмена</button>
                            <button onClick={Update} disabled={disabledAccept} className={styles.accept}>Принять</button>
                        </div>
                    </div>
                }
            />
        </>
    )
}