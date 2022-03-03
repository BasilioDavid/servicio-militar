import { IndexedDbService } from '../common/services/indexed-db-cache/indexed-db.service';

export class SoldierStorage extends IndexedDbService<string, any /*Soldier*/> {
  public constructor() {
    super('MilitaryService', 1, 'soldiers', 'id');
  }
}
