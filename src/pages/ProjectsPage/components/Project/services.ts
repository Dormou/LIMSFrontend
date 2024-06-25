export const getFiles = (documents: string[]) => {
    const result: File[] = []

    documents.map(async d => {
        const blob =  (await (await fetch(d)).blob())

        return result.push(new File([blob], 'doc.' + blob.type))
    })

    return result
}