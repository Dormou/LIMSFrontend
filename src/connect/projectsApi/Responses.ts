import { TestGroup, Project, ProjectArchive } from "./Types"

export type FetchProjectsResponse = Project[]


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
    perProcessCards: TestGroup[]
    processCards: TestGroup[]
    acceptCards: TestGroup[]
}