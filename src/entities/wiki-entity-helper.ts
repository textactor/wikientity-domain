
import { WikiEntityType, WikiEntity, WikiEntityData } from './wiki-entity';
import { filterWikiEntityData } from './filter-wiki-entity-data';
import { filterEntityCategories } from './filter-wiki-entity-categories';
import { uniq } from '@textactor/domain';

export type CreatingWikiEntityData = {
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
    countLinks: number
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
            aliases: uniq(wikiEntityData.aliases || []).filter(item => item.length > 1 && item.length <= 200).slice(0, 10),
            lang: lang,
            description: wikiEntityData.description,
            about: wikiEntityData.about,
            wikiDataId: wikiEntityData.wikiDataId,
            wikiPageId: wikiEntityData.wikiPageId,
            wikiPageTitle: wikiEntityData.wikiPageTitle,
            types: wikiEntityData.types,
            data: filterWikiEntityData(wikiEntityData.data),
            categories: filterEntityCategories(wikiEntityData.categories, 5),
            countLinks: wikiEntityData.countLinks,
        };

        if (wikiEntityData.type) {
            entity.type = wikiEntityData.type;
        }

        if (entity.types && !entity.types.length) {
            delete entity.types;
        }
        if (entity.categories && !entity.categories.length) {
            delete entity.categories;
        }
        if (entity.aliases && !entity.aliases.length) {
            delete entity.aliases;
        }
        if (entity.data && !Object.keys(entity.data).length) {
            delete entity.data;
        }

        if (entity.description && entity.description.length > 100) {
            entity.description = entity.description.substr(0, 100).trim();
        }

        if (entity.about) {
            if (entity.about.indexOf('==') > 0) {
                entity.about = entity.about.substr(0, entity.about.indexOf('==')).trim();
            }
            if (entity.about.length > 800) {
                entity.about = entity.about.substr(0, 800);
            }
        }

        return entity;
    }

    static isDisambiguation(data: WikiEntityData | undefined) {
        return data && data.P31 && data.P31.indexOf('Q4167410') > -1;
    }
}
