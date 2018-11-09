
import { WikiEntityType, WikiEntity, WikiEntityData } from './wiki-entity';
import { filterWikiEntityData } from './filter-wiki-entity-data';
import { filterEntityCategories } from './filter-wiki-entity-categories';
import { uniq } from '@textactor/domain';

export type BuildWikiEntityParams = {
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
    static build(params: BuildWikiEntityParams): WikiEntity {
        if (WikiEntityHelper.isDisambiguation(params.data)) {
            throw new Error(`Disambiguation entities are not accepted!`);
        }
        if (!/^Q\d+$/.test(params.wikiDataId)) {
            throw new Error(`wikiDataId is not valid!`);
        }
        const lang = params.lang.trim().toLowerCase();
        const entity: WikiEntity = {
            id: `${lang.toUpperCase()}${params.wikiDataId}`,
            name: params.name.trim(),
            aliases: uniq(params.aliases || []).filter(item => item.length > 1 && item.length <= 200).slice(0, 10),
            lang: lang,
            description: params.description,
            about: params.about,
            wikiDataId: params.wikiDataId,
            wikiPageId: params.wikiPageId,
            wikiPageTitle: params.wikiPageTitle,
            types: params.types,
            data: filterWikiEntityData(params.data),
            categories: filterEntityCategories(params.categories, 5),
            countLinks: params.countLinks,
        };

        if (params.type) {
            entity.type = params.type;
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
