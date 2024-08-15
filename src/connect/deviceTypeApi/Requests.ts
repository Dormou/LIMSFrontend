export type FetchDeviceTypesRequest = {
    limit: number
    numberSkip: number
}

export type AddDeviceTypeRequest = {
    name: string
    description: string
}

export type UpdateDeviceTypeRequest = {
    guid: string
    name: string
    description: string
}