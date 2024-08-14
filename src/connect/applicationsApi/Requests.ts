import { Application } from "./Types"

export type FetchApplicationsRequest = {
    limit: number
    numberSkip: number
}

export type FetchApplicationsArchiveRequest = {
    offset: number
    size: number
}

export type AddApplicationRequest = {
    name: string
    isProcess: boolean
    //tester: Tester
    producer: Application
    deadline: Date
    TYC: string
}

export type ApplicationStatusChangeRequest = {
    projectGuid: string,
    statusDescriptionName: string,
    message: string
}