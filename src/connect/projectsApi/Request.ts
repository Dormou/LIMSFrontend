import { Application, Tester } from "./Types"

export type FetchProjectsRequest = {
    limit: number
    numberSkip: number
}

export type FetchProjectsArchiveRequest = {
    offset: number
    size: number
}

export type AddProjectRequest = {
    name: string
    isProcess: boolean
    tester: Tester
    producer: Application
    deadline: Date
    TYC: string
}

export type UpdateProjectRequest = {
    guid: string,
    executorGuid: string,
    deadline: Date,
    dutRegistrationData: string,
    testDescriptionsIds: string[]
}

export type ProjectStatusChangeRequest = {
    projectGuid: string,
    StatusDescriptionName: string,
    message: string
}