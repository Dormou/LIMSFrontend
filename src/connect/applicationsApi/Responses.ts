import { TestGroup } from "../projectsApi/Types"
import { Application } from "./Types"

export type FetchApplicationsResponse = Application[]

export type ApplicationResponse = {
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

export type ApplicationStatusResponse = {
    guid: string
    dateOfCreation: string
    applicationGuid: string
    projectGuid: string
    name: string
    internalLabel: string
    externalLabel: string
    message: string
}