import { TestGroup } from "../projectsApi/Types"
import { DeviceType } from "./Types"

export type FetchDeviceTypesResponse = DeviceType[]

export type DeviceTypeResponse = {
    id: string
    name: string
    createAt: Date
    updateAt: Date
    deadline: Date
    isProcess: boolean
    perProcessCards: TestGroup[]
    processCards: TestGroup[]
    acceptCards: TestGroup[]
}

export type DeviceTypeStatusResponse = {
    guid: string
    dateOfCreation: string
    DeviceTypeGuid: string
    projectGuid: string
    name: string
    internalLabel: string
    externalLabel: string
    message: string
}