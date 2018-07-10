
import test from 'ava';
import { WikiEntityHelper } from './wikiEntityHelper';

test('#create: should faild on invalid wikiDataId', t => {

    t.throws(() => WikiEntityHelper.create({ lang: 'en', wikiDataId: '', name: '', data: {}, countLinks: 0 }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.create({ lang: 'en', wikiDataId: 'q190', name: '', countLinks: 0 }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.create({ lang: 'en', wikiDataId: 'A190', name: '', countLinks: 0 }), /wikiDataId/);

});
