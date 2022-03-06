import { Injectable } from '@angular/core';
import { IndexedDbService } from '../../../../common/services/indexed-db-cache/indexed-db.service';

@Injectable()
export class QueueStorage extends IndexedDbService<string, any> {
  public constructor() {
    super('Queue', 1, 'queue', '_id++');
  }
}
