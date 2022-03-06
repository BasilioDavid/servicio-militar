import { IndexedDbService } from '../../../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from '../../modules/soldier/soldier.interface';

export class CreateQueueStorage extends IndexedDbService<string, Soldier> {
  // solucion rapida lo de cambiarle el nombre a la base de datos
  public constructor() {
    super('MilitaryServiceCreateQueue', 1, 'create-queue', 'id');
  }
}
