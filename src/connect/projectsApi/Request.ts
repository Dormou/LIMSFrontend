import { Producer, Project, Tester } from "./Types"

export type FetchProjectsRequest = {
    offset: number
    size: number
}

export type FetchProjectsArchiveRequest = {
    offset: number
    size: number
}

export type AddProjectRequest = {
    name: string
    isProcess: boolean
    tester: Tester
    producer: Producer
    deadline: Date
    TYC: string
}