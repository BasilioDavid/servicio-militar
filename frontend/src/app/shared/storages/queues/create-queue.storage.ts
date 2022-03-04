import { IndexedDbService } from '../../../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from '../../soldier.interface';

export class CreateQueueStorage extends IndexedDbService<string, Soldier> {
  public constructor() {
    super('MilitaryService', 1, 'create-queue', 'id');
  }
}
