import { WikiEntity } from "../entities/wiki-entity";
import { Repository } from "@textactor/domain";



export interface WikiEntityRepository extends Repository<WikiEntity> {
    createOrUpdate(item: WikiEntity): Promise<WikiEntity>
}
