import { environment } from '../../../environments/environment';
import { FetchDataService } from '../../common/modules/fetch-data/fetch-data.service';
import { Injectable } from '@angular/core';
import { mapArrayIntoMap } from '../../common/helpers/bdgf.helpers';
import { QueueStorage } from '../storages/queues/queue.storage';
import { SoldierRepository } from './soldier.repository';

@Injectable()
export class QueueRepository {
  private queues!: { [queue: string]: any[] };

  constructor(
    private readonly fetchDataService: FetchDataService,
    private readonly queueStorage: QueueStorage,
    private readonly soldierRepository: SoldierRepository
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
    const valueToSave = { ...value, queue };
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
    const values2Send = { ...this.queues };
    this.queues = {};
    this.clearIndexedDB();
    this.sendToBackend(values2Send).subscribe(
      this.handleBackendResponse,
      this.handleBackendError(values2Send)
    );
  }

  private clearIndexedDB() {
    this.queueStorage.UPDATE.deleteAll();
    this.queueStorage.CREATE.deleteAll();
    this.queueStorage.UPDATE.deleteAll();
  }

  private sendToBackend(values: { [queue: string]: any[] }) {
    return this.fetchDataService.post<string[]>(
      environment.MASS_ENDPOINT,
      values
    );
  }

  private handleBackendResponse(idsFailed: string[]) {
    if (idsFailed.length) {
      this.soldierRepository.reload();
    }
  }

  private handleBackendError(oldValues: { [queue: string]: any[] }) {
    return () => {
      console.error('No se ha podido sincronizar la pila');
      console.error('Haciendo rollback');
      //TODO: habría que emitir algo
      this.queues = { ...this.queues, ...oldValues };
      this.restoreIndexedDB(oldValues);
    };
  }

  private restoreIndexedDB(oldValues: { [queue: string]: any[] }) {
    for (const [queue, oldValue] of Object.entries(oldValues)) {
      this.create(queue, oldValue);
    }
  }
}
