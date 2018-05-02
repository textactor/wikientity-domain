
import { RepUpdateData } from '@textactor/domain';
import { IWikiEntityRepository } from './wikiEntityRepository';
import { WikiEntity } from '../entities';


export class MemoryWikiEntityRepository implements IWikiEntityRepository {
    private db: Map<string, WikiEntity> = new Map()

    createOrUpdate(item: WikiEntity): Promise<WikiEntity> {
        if (this.db.has(item.id)) {
            return this.update({ item });
        }
        return this.create(item);
    }

    getById(id: string): Promise<WikiEntity> {
        return Promise.resolve(this.db.get(id));
    }

    getByIds(ids: string[]): Promise<WikiEntity[]> {
        const list: WikiEntity[] = [];
        for (let id of ids) {
            const item = this.db.get(id);
            if (item) {
                list.push(item);
            }
        }
        return Promise.resolve(list);
    }

    exists(id: string): Promise<boolean> {
        return Promise.resolve(this.db.has(id));
    }

    delete(id: string): Promise<boolean> {
        return Promise.resolve(this.db.delete(id));
    }

    create(data: WikiEntity): Promise<WikiEntity> {
        if (!!this.db.get(data.id)) {
            return Promise.reject(new Error(`Item already exists!`));
        }
        this.db.set(data.id, { ...{ createdAt: Date.now() }, ...data });

        return this.getById(data.id);
    }

    update(data: RepUpdateData<WikiEntity>): Promise<WikiEntity> {
        const item = this.db.get(data.item.id);
        if (!item) {
            return Promise.reject(new Error(`Item not found! id=${data.item.id}`));
        }

        for (let prop in data.item) {
            (<any>item)[prop] = (<any>data.item)[prop]
        }

        if (data.delete) {
            for (let prop of data.delete) {
                delete (<any>item)[prop];
            }
        }

        return Promise.resolve(item);
    }
}
