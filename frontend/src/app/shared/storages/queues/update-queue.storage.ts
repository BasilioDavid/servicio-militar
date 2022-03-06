import { IndexedDbService } from '../../../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from '../../modules/soldier/soldier.interface';

export class UpdateQueueStorage extends IndexedDbService<string, Soldier> {
  // solucion rapida
  public constructor() {
    super('MilitaryServiceUpdateQueue', 1, 'update-queue', 'id');
  }
}
