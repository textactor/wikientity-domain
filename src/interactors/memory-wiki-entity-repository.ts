
import { RepositoryUpdateData } from '@textactor/domain';
import { WikiEntityRepository } from './wiki-entity-repository';
import { WikiEntity } from '../entities/wiki-entity';


export class MemoryWikiEntityRepository implements WikiEntityRepository {
    private db: Map<string, WikiEntity> = new Map()

    async deleteStorage() {
        this.db.clear()
    }
    async createStorage() {

    }

    createOrUpdate(item: WikiEntity): Promise<WikiEntity> {
        if (this.db.has(item.id)) {
            return this.update({ id: item.id, set: item });
        }
        return this.create(item);
    }

    getById(id: string): Promise<WikiEntity | null> {
        return Promise.resolve(this.db.get(id) || null);
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

        data = { ...{ createdAt: Date.now() }, ...data };

        this.db.set(data.id, data);

        return Promise.resolve(data);
    }

    update(data: RepositoryUpdateData<WikiEntity>): Promise<WikiEntity> {
        const item = this.db.get(data.id);
        if (!item) {
            return Promise.reject(new Error(`Item not found! id=${data.id}`));
        }

        if (data.set) {
            for (let prop in data.set) {
                (<any>item)[prop] = (<any>data.set)[prop]
            }
        }

        if (data.delete) {
            for (let prop of data.delete) {
                delete (<any>item)[prop];
            }
        }

        return Promise.resolve(item);
    }
}
