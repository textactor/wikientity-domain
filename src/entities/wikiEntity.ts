
export enum WikiEntityType {
    EVENT = 'EVENT',
    ORG = 'ORG',
    PERSON = 'PERSON',
    PLACE = 'PLACE',
    PRODUCT = 'PRODUCT',
}

export type WikiEntityData = { [prop: string]: string[] }

export type WikiEntity = {
    id: string
    lang: string
    name: string
    aliases?: string[]
    wikiDataId: string
    wikiPageId?: number
    wikiPageTitle?: string
    description?: string
    about?: string
    type?: WikiEntityType
    types?: string[]
    data?: WikiEntityData
    categories?: string[]
    rank?: number

    createdAt?: number
    updatedAt?: number
}
