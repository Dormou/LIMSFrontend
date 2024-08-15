import { TestGroup } from "../applicationsApi/Types"
import { TestDescription } from "./Types"

export type FetchTestDescriptionsResponse = TestDescription[]

export type FetchTestGroupResponse = TestGroup[]

export type TestDescriptionResponse = {
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

export type TestDescriptionStatusResponse = {
    guid: string
    name: string
    dateOfCreation: string
    dateOfLastUpdate: string
    equipmentGuid: string
    equipmentName: string
}