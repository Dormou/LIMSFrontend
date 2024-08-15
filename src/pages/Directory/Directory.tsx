import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { setShowFooter } from '../../connect/store'
import { useFetchTestDescriptionsQuery } from '../../connect/testDescryptionsApi/testDescriptionsApi'
import { TestDescription } from '../../connect/testDescryptionsApi/Types'

import { Tests } from './components/Tests/Tests'
import { AddTestForm } from './components/AddForms/AddTestForm/AddTestForm'
import { Search } from '../components/Search/Search'

import dropdownIcon from '../../source/images/icons/dropdown.svg'

import styles from './Directory.module.scss'
import { AddTestDescriptionResponse } from '../../connect/testDescryptionsApi/Responses'
import { Equipments } from './components/Equipments/Equipments'
import { Equipment } from '../../connect/equipmentsApi/Types'
import { DeviceType } from '../../connect/deviceTypeApi/Types'
import { useFetchDeviceTypesQuery } from '../../connect/deviceTypeApi/deviceTypeApi'
import { useFetchEquipmentsQuery } from '../../connect/equipmentsApi/equipmentsApi'
import { AddEquipmentForm } from './components/AddForms/AddEquipmentForm/AddEquipmentForm'
import { DeviceTypes } from './components/DeviceTypes/DeviceTypes'
import { AddDeviceTypeForm } from './components/AddForms/AddDeviceTypeForm/AddDeviceTypeForm'

enum Scene {
    none = "Справочная информация",
    docs = "Нормативно-справочная информация",
    tests = "Тесты",
    equipments = "Оборудывание",
    deviceTypes = "Типы устройств",
    deviceSamples = "Образцы устройств",
}

export enum ChoseForm {
    none,
    docsAdd,
    testAdd,
    equipmentAdd,
    deviceTypeAdd,
    deviceSampleAdd,
    docsEdit,
    testEdit,
    equipmentEdit,
    deviceTypeEdit,
    deviceSampleEdit,
}

export const Directory = () => {
    const dispatch = useDispatch()

    dispatch(setShowFooter(false))
    
    const { isLoading: TestDescriptions, data: dataTestDescriptions } = useFetchTestDescriptionsQuery({limit: 400, numberSkip: 0})
    const { isLoading: isLoadingDeviceTypes, data: dataDeviceTypes } = useFetchDeviceTypesQuery({limit: 400, numberSkip: 0})
    const { isLoading: isLoadingEquipments, data: dataEquipments } = useFetchEquipmentsQuery({limit: 400, numberSkip: 0})


    const [ testDescriptions, setTestDescriptions ] = useState<TestDescription[]>([])
    const [ equipments, setEquipment ] = useState<Equipment[]>([])
    const [ deviceTypes, setDeviceTypes ] = useState<DeviceType[]>([])
    const [scene, setScene] = useState(Scene.deviceTypes)
    const [choseForm, setChoseForm] = useState(ChoseForm.none)
    const [isOpenDocs, setIsOpenDocs] = useState(false)
    const [isOpenDevices, setIsOpenDevices] = useState(false)
    const [documents, setDocuments] = useState([] as any[])


    useEffect(() => dataTestDescriptions? setTestDescriptions(dataTestDescriptions): undefined, [dataTestDescriptions])
    useEffect(() => dataDeviceTypes? setDeviceTypes(dataDeviceTypes): undefined, [dataDeviceTypes])
    useEffect(() => dataEquipments? setEquipment(dataEquipments): undefined, [dataEquipments])


    const search = (v: string) => v

    const filterByCountLetters5 = () => setDocuments(documents.filter(v => v.application.deviceType.name.length <= 5))

    const filterByZeroCards  = () => setDocuments(documents.filter(v => 
        v.application.tests
            ? v.application.tests.length < 1
            : true
    ))
    
    const withoutFilters = () => setDocuments(documents)

    const close = () => setChoseForm(ChoseForm.none)

    const saveTest = (test: TestDescription) => {
        const lTestDescs = [...testDescriptions]

        lTestDescs.push(test)

        setTestDescriptions(lTestDescs)
    }

    
    const saveEquipment = (equipment: Equipment) => {
        const lEquipment = [...equipments]

        lEquipment.push(equipment)

        setEquipment(lEquipment)
    }

    const saveDeviceType = (deviceType: DeviceType) => {
        const lDeviceTypes = [...deviceTypes]

        lDeviceTypes.push(deviceType)

        setDeviceTypes(lDeviceTypes)
    }

    const updateTest = (test: TestDescription) => {
        let lTestDescs = [...testDescriptions]

        lTestDescs = lTestDescs.filter(td => td.guid !== test.guid)

        lTestDescs.push(test)

        setTestDescriptions(lTestDescs)
    }

    
    const updateEquipment = (equipment: Equipment) => {
        let lEquipment = [...equipments]

        lEquipment = lEquipment.filter(td => td.guid !== equipment.guid)

        lEquipment.push(equipment)

        setEquipment(lEquipment)
    }

    const updateDeviceType = (deviceType: DeviceType) => {
        let lDeviceTypes = [...deviceTypes]

        lDeviceTypes = lDeviceTypes.filter(td => td.guid !== deviceType.guid)

        lDeviceTypes.push(deviceType)

        setDeviceTypes(lDeviceTypes)
    }

    const dropTest = (id: string) => setTestDescriptions(testDescriptions.filter(td => td.guid !== id)) 

    const dropEquipment = (id: string) => setEquipment(equipments.filter(td => td.guid !== id)) 

    const dropDeviceType = (id: string) => setDeviceTypes(deviceTypes.filter(td => td.guid !== id)) 

    return (
        <>
            {ChoseForm.testAdd === choseForm && <AddTestForm save={saveTest} close={close}/>}
            {ChoseForm.equipmentAdd === choseForm && <AddEquipmentForm save={saveEquipment} close={close}/>}
            {ChoseForm.deviceTypeAdd === choseForm && <AddDeviceTypeForm save={saveDeviceType} close={close}/>}
            <div className={styles.main}>
                <div className={styles.header}>
                    {scene !== Scene.none && <button onClick={() => setScene(Scene.none)} className={styles.back}>
                                <img className={styles.icon} src={dropdownIcon} alt={'<'}/>
                                <div className={styles.title}>Назад</div>
                    </button> }
                    <h1 className={styles.title}>{scene}</h1>
                </div>
                <div className={styles.SearchAndFilter}>
                        {scene === Scene.docs && <button onClick={() => setChoseForm(ChoseForm.docsAdd)} className={styles.addTest}>Добавить документ</button> }
                        {scene === Scene.tests && <button onClick={() => setChoseForm(ChoseForm.testAdd)} className={styles.addTest}>Добавить тест</button> }
                        {scene === Scene.deviceSamples && <button onClick={() => setChoseForm(ChoseForm.deviceSampleAdd)} className={styles.addTest}>Добавить образец</button> }
                        {scene === Scene.deviceTypes && <button onClick={() => setChoseForm(ChoseForm.deviceTypeAdd)} className={styles.addTest}>Добавить устройство</button> }
                        {scene === Scene.equipments && <button onClick={() => setChoseForm(ChoseForm.equipmentAdd)} className={styles.addTest}>Добавить устройство</button> }
                        <div className={styles.search}>
                            <Search callback={search}/>
                        </div>
                </div>
                <div className={styles.scene}>
                    {scene === Scene.none &&
                        <div className={styles.menu}>
                            <div onClick={() => setIsOpenDocs(!isOpenDocs)} className={styles.docs}>
                                <div className={styles.header}>
                                    <img className={isOpenDocs? styles.icon: styles.iconActive} src={dropdownIcon} alt='+'/>
                                    <div className={styles.title}>Нормативно-справочная информация</div>
                                </div>
                                {isOpenDocs &&
                                    <div className={styles.menu}>
                                        <div className={styles.item}>
                                            <img className={styles.icon} src={dropdownIcon} alt='+'/>
                                            <div className={styles.normative}>Нормативная документация</div>
                                        </div>
                                        <div onClick={() => setScene(Scene.tests)} className={styles.item}>
                                            <img className={styles.icon} src={dropdownIcon} alt='+'/>
                                            <div className={styles.test}>Тесты</div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={styles.devices}>
                                <div onClick={() => setIsOpenDevices(!isOpenDevices)} className={styles.header}>
                                    <img className={isOpenDevices? styles.icon: styles.iconActive} src={dropdownIcon} alt='+'/>
                                    <div className={styles.title}>Лабораторное оборудование и устройства</div>
                                </div>
                                {isOpenDevices &&
                                    <div className={styles.menu}>
                                        <div onClick={() => setScene(Scene.equipments)} className={styles.item}>
                                            <img className={styles.icon} src={dropdownIcon} alt='+'/>
                                            <div className={styles.equipment}>Оборудование</div>
                                        </div>
                                        <div onClick={() => setScene(Scene.deviceTypes)} className={styles.item}>
                                            <img className={styles.icon} src={dropdownIcon} alt='+'/>
                                            <div className={styles.deviceTypes}>Типы устройств</div>
                                        </div>
                                        <div className={styles.item}>
                                            <img className={styles.icon} src={dropdownIcon} alt='+'/>
                                            <div className={styles.deviceSamples}>Образцы устройств</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    {scene === Scene.tests && <Tests testDescs={testDescriptions} save={saveTest} update={updateTest} dropSave={dropTest}/>}
                    {scene === Scene.equipments && <Equipments equipments={equipments} save={saveEquipment} update={updateEquipment} dropSave={dropEquipment}/>}
                    {scene === Scene.deviceTypes && <DeviceTypes deviceTypes={deviceTypes} save={saveDeviceType} update={updateDeviceType} dropSave={dropDeviceType}/>}

                </div>
            </div>
        </>
    )
}