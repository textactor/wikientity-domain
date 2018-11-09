
import test from 'ava';
import { WikiEntityHelper } from './wiki-entity-helper';

test('#build: should faild on invalid wikiDataId', t => {

    t.throws(() => WikiEntityHelper.build({ lang: 'en', wikiDataId: '', name: '', data: {}, countLinks: 0 }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.build({ lang: 'en', wikiDataId: 'q190', name: '', countLinks: 0 }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.build({ lang: 'en', wikiDataId: 'A190', name: '', countLinks: 0 }), /wikiDataId/);

});
