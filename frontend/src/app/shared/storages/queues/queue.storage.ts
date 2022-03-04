import { UpdateQueueStorage } from './update-queue.storage';
import { CreateQueueStorage } from './create-queue.storage';
import { DeleteQueueStorage } from './delete-queue.storage';
import { Injectable } from '@angular/core';

@Injectable()
export class QueueStorage {
  public constructor(
    public readonly CREATE: CreateQueueStorage,
    public readonly UPDATE: UpdateQueueStorage,
    public readonly DELETE: DeleteQueueStorage
  ) {}
}
