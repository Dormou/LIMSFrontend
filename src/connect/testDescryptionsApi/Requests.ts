import { TestDescription, TestDescriptionResult, TestDescriptionStatus } from "./Types"

export type UpdateTestDescriptionRequest = {
    guid: string
    name: string
    description: string
    equipmentGuid: string
}

export type AddTestDescriptionRequest = {
    name: string
    description: string
    equipmentGuid: string
}

export type FetchTestDescriptionsRequest = {
    limit: number
    numberSkip: number
}