import { JoiEntityValidator } from "@textactor/domain";
import Joi = require('joi');
import { WikiEntity, WIKI_ENTITY_TYPE } from "./wiki-entity";


export class WikiEntityValidator extends JoiEntityValidator<WikiEntity> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[A-Z]{2}Q\d+$/),
    lang: Joi.string().regex(/^[a-z]{2}$/),

    name: Joi.string().min(2).max(200),
    aliases: Joi.array().items(Joi.string().min(2).max(200)).unique().max(10),
    abbr: Joi.string().min(1).max(50),
    wikiDataId: Joi.string().regex(/^Q\d+$/),
    wikiPageId: Joi.number().integer().min(1),
    wikiPageTitle: Joi.string().min(2).max(200),
    type: Joi.valid('EVENT', 'ORG', 'PERSON', 'PLACE', 'PRODUCT', 'WORK'),
    types: Joi.array().items(Joi.string().min(2).max(50)).unique().max(20),
    description: Joi.string().max(200).truncate(),
    about: Joi.string().max(800).truncate(),
    categories: Joi.array().items(Joi.string().min(2).max(250)).unique().max(10),
    data: Joi.object().pattern(/^P\d+$/, Joi.array().items(Joi.string().min(1).max(500).required()).min(1).max(10)),
    countLinks: Joi.number().integer().min(1).max(500),

    createdAt: Joi.number().min(1).integer(),
    updatedAt: Joi.number().min(1).integer(),
}

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    lang: schema.lang.required(),

    name: schema.name.required(),
    aliases: schema.aliases,
    abbr: schema.abbr,
    wikiDataId: schema.wikiDataId.required(),
    wikiPageId: schema.wikiPageId,
    wikiPageTitle: schema.wikiPageTitle,
    type: schema.type,
    types: schema.types,
    description: schema.description,
    about: schema.about,
    categories: schema.categories,
    data: schema.data,
    countLinks: schema.countLinks.required(),

    createdAt: schema.createdAt.required(),
    updatedAt: schema.updatedAt.required(),
}).required();

const updateSet = WIKI_ENTITY_TYPE.updateFields().reduce<Joi.SchemaMap>((map, field) => {
    map[field] = (<any>schema)[field];
    return map;
}, {});

const updateDelete = Joi.string().valid(WIKI_ENTITY_TYPE.deleteFields());

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys(updateSet),
    delete: Joi.array().items(updateDelete),
}).or('set', 'delete').required();
