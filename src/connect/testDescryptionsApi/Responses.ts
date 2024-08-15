import { TestDescription } from "./Types"

export type TestDescriptionResponse = {
    guid: string
    name: string;
    description: string
    equipmentGuid: string
    //equipment: Equipment;
    equipmentName: string
    dateOfCreation: Date
    dateOfLastUpdate: Date
}

export type FetchTestDescriptionsResponse = TestDescription[]

export type AddTestDescriptionResponse = {
    guid: string
    name: string;
    description: string
    equipmentGuid: string
    //equipment: Equipment;
    equipmentName: string
    dateOfCreation: Date
    dateOfLastUpdate: Date
}

export type UpdateTestDescriptionResponse = {
    guid: string
    name: string;
    description: string
    equipmentGuid: string
    //equipment: Equipment;
    equipmentName: string
    dateOfCreation: Date
    dateOfLastUpdate: Date
}