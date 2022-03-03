import { IndexedDbService } from '../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from './soldier.interface';

export class SoldierStorage extends IndexedDbService<string, Soldier> {
  public constructor() {
    super('MilitaryService', 1, 'soldiers', 'id');
  }
}
