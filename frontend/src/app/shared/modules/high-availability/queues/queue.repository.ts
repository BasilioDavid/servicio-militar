import { environment } from '../../../../../environments/environment';
import { FetchDataService } from '../../../../common/modules/fetch-data/fetch-data.service';
import { Injectable } from '@angular/core';
import { QueueStorage } from './queue.storage';

@Injectable()
export class QueueRepository {
  private queue!: any[];

  constructor(
    private readonly fetchDataService: FetchDataService,
    private readonly queueStorage: QueueStorage
  ) {
    this.read();
  }

  private async read() {
    this.queue = await this.queueStorage.findAll();
  }

  public create(queue: string, value: any) {
    const valueWithQueue = { ...value, queue };
    this.registerValue(valueWithQueue);
  }

  private registerValue(value: any) {
    this.queue = [...this.queue, value];
    this.saveValuesInIndexedDB(value);
  }

  private saveValuesInIndexedDB(value: any) {
    this.queueStorage.put(value);
  }

  public send(onSended: () => void) {
    const prevQueues = [...this.queue];
    this.queue = [];
    this.clearIndexedDB();
    this.sendToBackend(prevQueues).subscribe(onSended, () =>
      this.rollback(prevQueues)
    );
  }

  private clearIndexedDB() {
    this.queueStorage.deleteAll();
  }

  private sendToBackend(values: any[]) {
    return this.fetchDataService.post<string>(
      environment.MASS_ENDPOINT,
      values
    );
  }

  public rollback(prevQueue: any[]) {
    console.warn('no se ha podido subir los datos al backend');
    this.queue = [...this.queue, ...prevQueue];
    this.restoreIndexedDB(prevQueue);
  }

  private restoreIndexedDB(oldValues: any[]) {
    for (const oldValue of oldValues) {
      this.registerValue(oldValue);
    }
  }
}
