import { TestGroup, InternalUser, ExternalUser } from "./Types"

export type FetchInternalUsersResponse = InternalUser[]

export type InternalUserResponse = {
    guid: string
    dateOfCreation: Date
    dateOfLastUpdate: Date
    firstName: string
    lastName: string
    email: string
    secondName: string
    position: string
    phoneNumber: string
    isVerified: boolean
}

export type FetchExternalUsersResponse = ExternalUser[]

export type ExternalUserResponse = {
    guid: string
    dateOfCreation: Date
    dateOfLastUpdate: Date
    firstName: string
    lastName: string
    email: string
    secondName: string
    position: string
    company: string
    address: string
    phoneNumber: string
    isVerified: boolean
}