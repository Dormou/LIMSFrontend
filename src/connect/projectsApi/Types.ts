export type Project = {
    id: string
    typeName: string
    modelName: string
    isProcess: boolean
    tester: Tester
    application: Application
    cards: Card[]
    createAt: Date
    updateAt: Date
    deadline: Date
    status: StatusProject
}

export enum StatusProject {
    agreement,
    agreementSetup,
    awaitDevice,
    inWork,
    release
}

export type ProjectArchive = {
    id: string
    typeName: string
    modelName: string
    isProcess: boolean
    tester: Tester
    application: Application
    cards: CardArchive[]
    deadline: Date
    release: Date
    status: StatusProject
}

export type Message = {
    userid: string
    username: string
    value: string
}

export type Application = {
    name: string
}

export type Expert = {
    firstname: string
    lastname: string
    datePinnded: Date
}

export type Creator = {
    id: string
    firstname: string
    lastname: string
}

export type Card = {
    id: string
    name: string
    expert: Expert
    documents: string[]
    messages: Message[]
    deadline: Date
    release: Date
    descryption: string
    status: CardStatus
    creator: Creator
    createAt: Date
    result: Result
    equipment: Equipment
}

export type CardArchive = {
    id: string
    name: string
    expert: Expert
    documents: string[]
    messages: Message[]
    deadline: Date
    release: Date
    descryption: string
    creator: Creator
    createAt: Date
    result: Result
    equipment: Equipment
}

export type Equipment = {
    id: string
    name: string
}

export type Test = {
    id: string
}

export enum Result {
    none,
    accept,
    reject
}

export enum CardStatus {
    perProcess,
    process,
    release
}

export type Tester = {
    firstname: string
    lastname: string
}

export enum StatusTest {
    accept,
    reject,
    undefined
}

