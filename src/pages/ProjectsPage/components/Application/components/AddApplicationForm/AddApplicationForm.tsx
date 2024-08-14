import { useEffect, useRef, useState } from 'react'
import { Application, TestGroup } from '../../../../../../connect/applicationsApi/Types'

import { ModalWindow } from '../../../../../components/ModalWindow/ModalWinow'

import plusIcon from '../../../../../../source/images/icons/ant-design_plus-outlined.svg'

import styles from './AddApplicationForm.module.scss'
import { useAddApplicationMutation } from '../../../../../../connect/applicationsApi/applicationsApi'
import { useFetchDeviceTypesQuery } from '../../../../../../connect/deviceTypeApi/deviceTypeApi'

interface propsAddApplicationForm {
    testsGroups: TestGroup[]
    applicantGuid: string
    close: () => void
    save: (application: Application) => void
}

type Test = {
    testId: string
    tgId: string
}

export const AddApplicationForm = (props: propsAddApplicationForm) => {
    const {isLoading: isLoadingDeviceTypes, data: dataDeviceTypes} = useFetchDeviceTypesQuery({limit: 50, numberSkip: 0})
    const [addApplication] = useAddApplicationMutation()

    const [choseTestsGroupsIds, setChoseTestsGroupsIds] = useState([] as string[])
    const [chosegDeviceTypeId, setChosegDeviceTypeId] = useState('')
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openDropdownTypeDevices, setOpenDropdownTypeDevices] = useState(false)
    const [disabledAccept, setDisabledAccept] = useState(true)


    const _comment = useRef('')
    const _deviceModel = useRef('')
    const _testsIds = useRef([] as Test[])

    const varificationDecorator = (callback: () => void) => {
        callback()

        if(
            _comment.current.length > 0 &&
            _deviceModel.current.length > 0 &&
            chosegDeviceTypeId.length > 0 &&
            _testsIds.current.length > 0
        ) setDisabledAccept(false)
        else if (!disabledAccept) setDisabledAccept(true)
    }

    const Add = async () => {
        try {
            const res = await addApplication({
                applicantGuid: props.applicantGuid,
                deviceModel: _deviceModel.current,
                deviceTypeGuid: chosegDeviceTypeId,
                comment: _comment.current,
                testGuids: _testsIds.current.map(t => t.testId),
            }).unwrap()

            if(res) props.save(res) 
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
                        <div className={styles.inline}>
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
                                        <div onClick={() => setOpenDropdownTypeDevices(!openDropdownTypeDevices)} className={styles.open}>@</div>
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
                            <div className={styles.modelName}>
                                <div className={styles.title}>Модель устройства</div>
                                <input onChange={(e) => varificationDecorator(() => _deviceModel.current = e.target.value)} className={styles.value}></input>
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
                                    <div onClick={() => setOpenDropdown(!openDropdown)} className={styles.open}>@</div>
                                </div>
                                {openDropdown && 
                                    <div className={styles.items}>
                                        {props.testsGroups.filter(tg => undefined === choseTestsGroupsIds.find(tgid => tgid === tg.equipmentGuid)).map(tg => 
                                            <div key={tg.equipmentGuid} className={styles.item}>
                                                <div 
                                                    key={tg.equipmentGuid} 
                                                    onClick={() => setChoseTestsGroupsIds(choseTestsGroupsIds.concat(tg.equipmentGuid))}
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
                            {props.testsGroups.filter(tg => undefined !== choseTestsGroupsIds.find(tgid => tgid === tg.equipmentGuid)).map(tg => 
                                <div key={tg.equipmentGuid} className={styles.testsGroup}>
                                    <div className={styles.name}>{tg.equipmentName}</div>
                                    <div className={styles.tests}>
                                        {tg.tests?.map(t => 
                                            <div key={t.guid} className={styles.test}>
                                                <input 
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
                            <input onChange={(e) => varificationDecorator(() => _comment.current = e.target.value)} className={styles.value}></input>
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