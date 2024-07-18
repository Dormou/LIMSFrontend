export const ItemTypes = {
    Card: 'Card',
}

export type DropResCard = {
    column: string
    callback: (id: string) => void
}