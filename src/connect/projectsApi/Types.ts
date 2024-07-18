export type Project = {
    id: string
    name: string
    isProcess: boolean
    tester: Tester
    producer: Producer
    cards: Card[]
    createAt: Date
    updateAt: Date
    deadline: Date
    TYC: string
}

export type ProjectArchive = {
    id: string
    name: string
    isProcess: boolean
    tester: Tester
    producer: Producer
    cards: CardArchive[]
    deadline: Date
    release: Date
    TYC: string
}

export type Message = {
    userid: string
    username: string
    value: string
}

export type Producer = {
    name: string
}

export type Expert = {
    firstname: string
    lastname: string
    datePinnded: Date
}

export type Test = {
    name: string
    accept: StatusTest
}

export type Creator = {
    id: string
    firstname: string
    lastname: string
}

export type Card = {
    id: string
    name: string
    mandatoryTests: Test[]
    nonMandatoryTests: Test[]
    expert: Expert
    documents: string[]
    messages: Message[]
    deadline: Date
    release: Date
    descryption: string
    status: CardStatus
    creator: Creator
    createAt: Date
}

export type CardArchive = {
    id: string
    name: string
    mandatoryTests: Test[]
    nonMandatoryTests: Test[]
    expert: Expert
    documents: string[]
    messages: Message[]
    deadline: Date
    release: Date
    descryption: string
    creator: Creator
    createAt: Date
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

export enum StatusProject {
    application,
    inProccess
}

