import {environment} from '../../../environments/environment';
import {FetchDataService} from '../../common/modules/fetch-data/fetch-data.service';
import {Injectable} from '@angular/core';
import {QueueStorage} from '../storages/queues/queue.storage';

@Injectable()
export class QueueRepository {
  private queues!: { [queue: string]: any[] };
  private prevQueues!: { [queue: string]: any[] };

  constructor(
    private readonly fetchDataService: FetchDataService,
    private readonly queueStorage: QueueStorage
  ) {
    this.read();
  }

  private async read() {
    this.queues = await this.getValuesFromIndexedDB();
  }

  private async getValuesFromIndexedDB() {
    return {
      [environment.QUEUES.CREATE]: await this.queueStorage.CREATE.findAll(),
      [environment.QUEUES.UPDATE]: await this.queueStorage.UPDATE.findAll(),
      [environment.QUEUES.DELETE]: await this.queueStorage.DELETE.findAll(),
    };
  }

  public async create(queue: string, value: any) {
    this.queues[queue].push(value);
    await this.saveValuesInIndexedDB(queue, value);
  }

  private saveValuesInIndexedDB(queue: string, value: any) {
    const valueToSave = {...value, queue};
    switch (queue) {
      case environment.QUEUES.CREATE:
        this.queueStorage.CREATE.put(valueToSave);
        break;
      case environment.QUEUES.UPDATE:
        this.queueStorage.UPDATE.put(valueToSave);
        break;
      case environment.QUEUES.DELETE:
        this.queueStorage.DELETE.put(valueToSave);
    }
  }

  public send() {
    this.prevQueues = {...this.queues};
    this.queues = {};
    this.clearIndexedDB();
    return this.sendToBackend(this.prevQueues);
  }

  private clearIndexedDB() {
    this.queueStorage.UPDATE.deleteAll();
    this.queueStorage.CREATE.deleteAll();
    this.queueStorage.UPDATE.deleteAll();
  }

  private sendToBackend(values: { [queue: string]: any[] }) {
    return this.fetchDataService.post<string>(
      environment.MASS_ENDPOINT,
      values
    );
  }

  public rollback() {
    console.warn("no se ha podido subir los datos al backend")
    this.queues = {...this.queues, ...this.prevQueues}
    this.restoreIndexedDB(this.prevQueues);
  }

  private restoreIndexedDB(oldValues: { [queue: string]: any[] }) {
    for (const [queue, oldValue] of Object.entries(oldValues)) {
      this.create(queue, oldValue);
    }
  }
}
