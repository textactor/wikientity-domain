
import { WikiEntityType, WikiEntity, WikiEntityData } from './wikiEntity';
import { uniq } from '@textactor/domain';
import { filterWikiEntityData } from './filterWikiEntityData';
import { filterEntityCategories } from './filterWikiEntityCategories';

export type CreatingWikiEntityData = {
    lang: string
    name: string
    names: string[]
    wikiDataId: string
    wikiPageId?: number
    wikiPageTitle?: string
    description?: string
    about?: string
    type?: WikiEntityType
    types?: string[]
    data?: WikiEntityData
    categories?: string[]
}

export class WikiEntityHelper {
    static create(wikiEntityData: CreatingWikiEntityData): WikiEntity {
        if (WikiEntityHelper.isDisambiguation(wikiEntityData.data)) {
            throw new Error(`Disambiguation entities are not accepted!`);
        }
        if (!/^Q\d+$/.test(wikiEntityData.wikiDataId)) {
            throw new Error(`wikiDataId is not valid!`);
        }
        const lang = wikiEntityData.lang.trim().toLowerCase();
        const entity: WikiEntity = {
            id: `${lang.toUpperCase()}${wikiEntityData.wikiDataId}`,
            name: wikiEntityData.name.trim(),
            names: uniq(wikiEntityData.names || []),
            lang: lang,
            description: wikiEntityData.description,
            about: wikiEntityData.about,
            wikiDataId: wikiEntityData.wikiDataId,
            wikiPageId: wikiEntityData.wikiPageId,
            wikiPageTitle: wikiEntityData.wikiPageTitle,
            types: wikiEntityData.types,
            data: filterWikiEntityData(wikiEntityData.data),
            categories: filterEntityCategories(wikiEntityData.categories, 5),
        };

        if (wikiEntityData.type) {
            entity.type = wikiEntityData.type;
        }

        return entity;
    }

    static isDisambiguation(data: WikiEntityData) {
        return data && data.P31 && data.P31.indexOf('Q4167410') > -1;
    }
}
