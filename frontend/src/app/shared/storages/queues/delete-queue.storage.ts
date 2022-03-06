import { IndexedDbService } from '../../../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from '../../modules/soldier/soldier.interface';

export class DeleteQueueStorage extends IndexedDbService<string, Soldier> {
  // solucion rapida
  public constructor() {
    super('MilitaryServiceDeleteQueue', 1, 'delete-queue', 'id');
  }
}
