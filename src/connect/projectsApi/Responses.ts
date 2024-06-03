import { Card, Project, ProjectArchive } from "./Types"

export type FetchProjectsResponse = {
    projects: Project[]
}

export type FetchProjectsArchiveResponse = {
    projects: ProjectArchive[]
}

export type ProjectResponse = {
    id: string
    name: string
    createAt: Date
    updateAt: Date
    deadline: Date
    isProcess: boolean
    perProcessCards: Card[]
    processCards: Card[]
    acceptCards: Card[]
}