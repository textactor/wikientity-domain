import { uniq } from "@textactor/domain";
import { WikiEntityType, WikiEntityData } from "./wikiEntity";

export function filterWikiEntityData(data: WikiEntityData | undefined) {
    if (data) {
        data = { ...data };
        for (let prop in data) {
            if (ENTITY_DATA_PROPS.indexOf(prop) < 0 || !Array.isArray(data[prop])) {
                delete data[prop];
                continue;
            }

            data[prop] = uniq(data[prop]).slice(0, 5);
            if (data[prop].length === 0) {
                delete data[prop];
            }
        }
    }
    return data;
}

const ENTITY_DATA_PROPS_MAP: Map<WikiEntityType, string[]> = new Map();

ENTITY_DATA_PROPS_MAP.set(WikiEntityType.PERSON,
    [
        // image
        'P18',
        // place of birth
        'P19',

        // place of death
        'P20',
        // sex or gender
        'P21',
        // father
        'P22',
        // mother
        'P25',
        // spouse
        'P26',
        // country of citizenship
        'P27',


        // instance of
        'P31',
        // position held
        // 'P39',

        // child
        'P40',

        // educated at
        'P69',

        // native language
        'P103',
        // occupation
        'P106',
        // award received
        // 'P166',

        // ISNI
        'P213',
        // VIAF ID
        'P214',
        // GND ID
        'P227',

        // IMDb ID
        'P345',

        // date of birth
        'P569',
        // date of death
        'P570',

        // family name
        'P734',
        // given name
        'P735',

        // official website
        'P856',

        // nickname
        'P1449',
        // birth name
        'P1477',
        // name in native language
        'P1559',

        // Twitter username
        'P2002',
        // Instagram username
        'P2003',
        // Facebook ID
        'P2013',
        // YouTube channel ID
        'P2397',

        // sibling
        'P3373',
        // Quora topic ID
        'P3417',
        // stepparent
        'P3448'
    ]);

ENTITY_DATA_PROPS_MAP.set(WikiEntityType.PLACE,
    [
        // instance of
        'P31',
        // image
        'P18',
        // country
        'P17',
        // capital of
        'P1376',
        // located in the administrative territorial entity
        'P131',
        // coordinate location
        'P625',
        // population
        // 'P1082',
        // elevation above sea level
        'P2044',
        // located in time zone
        'P421',
        // flag image
        'P41',
        // GeoNames ID
        'P1566',
        // ISO 3166-2 code
        'P300',
        // FIPS 10-4 (countries and regions)
        'P901',
        // postal code
        'P281',
        // capital
        'P36',
        // Facebook Places ID
        'P1997',
        // Twitter username
        'P2002',
        // Instagram username
        'P2003',
        // Facebook ID
        'P2013',
        // YouTube channel ID
        'P2397',
        // official website
        'P856',
        // Quora topic ID
        'P3417'
    ]);

ENTITY_DATA_PROPS_MAP.set(WikiEntityType.ORG,
    [
        // instance of
        'P31',
        // image
        'P18',
        // logo image
        'P154',
        // country
        'P17',
        // inception
        'P571',
        // founded by / founder
        'P112',
        // chairperson
        'P488',
        // membership
        'P2124',
        // headquarters location
        'P159',
        // CEO (chief executive officer)
        'P169',
        // chief operating officer
        'P1789',
        // owned by
        'P127',
        // employees
        'P1128',
        // Twitter username
        'P2002',
        // Instagram username
        'P2003',
        // Facebook ID
        'P2013',
        // YouTube channel ID
        'P2397',
        // official website
        'P856',
        // Quora topic ID
        'P3417'
    ]);

ENTITY_DATA_PROPS_MAP.set(WikiEntityType.EVENT,
    [
        // instance of
        'P31',
        // genre
        'P136',
        // continent
        'P30',
        // start time
        'P580',
        // end time
        'P582',
        // organizer
        'P664',
        // location
        'P276',
        // point in time
        'P585',
        // winner
        'P1346',


        // image
        'P18',
        // country
        'P17',
        // coordinate location
        'P625',

        // Twitter username
        'P2002',
        // Instagram username
        'P2003',
        // Facebook ID
        'P2013',
        // YouTube channel ID
        'P2397',
        // official website
        'P856',
        // Quora topic ID
        'P3417'
    ]);

ENTITY_DATA_PROPS_MAP.set(WikiEntityType.PRODUCT,
    [
        // instance of
        'P31',
        // manufacturer
        'P176',
        // designed by
        'P287',
        // series
        'P179',
        // operating system
        'P306',
        // developer
        'P178',


        // image
        'P18',
        // logo image
        'P154',

        // Twitter username
        'P2002',
        // Instagram username
        'P2003',
        // Facebook ID
        'P2013',
        // YouTube channel ID
        'P2397',
        // official website
        'P856',
        // Quora topic ID
        'P3417'
    ]);


const UNKNOWN_ENTITY_PROPS = [
    // instance of
    'P31',
    // image
    'P18',
    // logo image
    'P154',

    // Twitter username
    'P2002',
    // Instagram username
    'P2003',
    // Facebook ID
    'P2013',
    // YouTube channel ID
    'P2397',
    // official website
    'P856',
    // Quora topic ID
    'P3417'
];

let ENTITY_DATA_PROPS: string[] = [];

for (let type of ENTITY_DATA_PROPS_MAP.keys()) {
    const result = ENTITY_DATA_PROPS_MAP.get(type);
    if (result) {
        ENTITY_DATA_PROPS = ENTITY_DATA_PROPS.concat(result);
    }
}

ENTITY_DATA_PROPS = ENTITY_DATA_PROPS.concat(UNKNOWN_ENTITY_PROPS);

ENTITY_DATA_PROPS = uniq(ENTITY_DATA_PROPS);
