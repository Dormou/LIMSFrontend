export type UpdateEquipmentRequest = {
    guid: string
    name: string
    description: string
}

export type AddEquipmentRequest = {
    name: string
    description: string
}

export type FetchEquipmentsRequest = {
    limit: number
    numberSkip: number
}