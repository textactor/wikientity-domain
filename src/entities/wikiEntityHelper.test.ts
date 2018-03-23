
import test from 'ava';
import { WikiEntityHelper } from './wikiEntityHelper';

test('#create: should faild on invalid wikiDataId', t => {

    t.throws(() => WikiEntityHelper.create({ lang: 'en', names: [], wikiDataId: null, name: '' }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.create({ lang: 'en', names: [], wikiDataId: 'q190', name: '' }), /wikiDataId/);
    t.throws(() => WikiEntityHelper.create({ lang: 'en', names: [], wikiDataId: 'A190', name: '' }), /wikiDataId/);

});
