import { IndexedDbService } from '../../../common/services/indexed-db-cache/indexed-db.service';
import { Soldier } from '../../soldier.interface';
import { UpdateQueueStorage } from './update-queue.storage';
import { CreateQueueStorage } from './create-queue.storage';
import { DeleteQueueStorage } from './delete-queue.storage';
import { environment } from '../../../../environments/environment';

export class QueueStorage {
  public constructor(
    public readonly CREATE: CreateQueueStorage,
    public readonly UPDATE: UpdateQueueStorage,
    public readonly DELETE: DeleteQueueStorage
  ) {}
}
