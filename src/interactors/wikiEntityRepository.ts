
import { IWriteRepository, IReadRepository } from '@textactor/domain';
import { WikiEntity } from '../entities';

export interface IWikiEntityWriteRepository extends IWriteRepository<string, WikiEntity> {
    createOrUpdate(item: WikiEntity): Promise<WikiEntity>
}

export interface IWikiEntityReadRepository extends IReadRepository<string, WikiEntity> {

}

export interface IWikiEntityRepository extends IWikiEntityReadRepository, IWikiEntityWriteRepository {

}
