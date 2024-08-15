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
    applicantGuid: string
    deviceModel: string
    deviceTypeGuid: string
    comment: string
    testDescriptions: string[]
}

export type UpdateApplicationRequest = {
    guid: string;
    deviceModel: string;
    deviceTypeGuid: string;
    comment: string;
    TestGuids: string[];
}

export type ApplicationStatusChangeRequest = {
    applicationGuid: string
    statusDescriptionName: string
    message: string
}