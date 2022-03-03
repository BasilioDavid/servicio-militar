import { Injectable } from '@angular/core';
import { NetworkHandlerService } from '../common/services/networkHandler/networkHandler.service';
import { FetchDataService } from '../common/modules/fetch-data/fetch-data.service';
import { SoldierStorage } from './soldier.storage';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HighAvailabilityService {
  public static readonly CREATE_QUEUE = 'CREATE';
  public static readonly UPDATE_QUEUE = 'UPDATE';
  public static readonly DELETE_QUEUE = 'DELETE';

  private queues: {
    [queue: string]: any[];
  } = {};

  public constructor(
    private readonly networkHandlerService: NetworkHandlerService,
    private readonly fetchDataService: FetchDataService,
    private readonly indexedDBCacheService: SoldierStorage
  ) {
    this.networkHandlerService.addHandlerForEvent('online', () =>
      this.online()
    );
    this.networkHandlerService.addHandlerForEvent('offline', () =>
      this.offline()
    );
  }

  private online() {
    console.info('switching onlinen mode...');
    // this.syncCreate();
  }

  private async syncCreate() {
    const oldQueue = [...this.queues.CREATE];
    this.queues.CREATE = [];
    try {
      this.fetchDataService
        .post<string[]>(environment.MASS_ENDPOINT, oldQueue)
        .subscribe((data) =>
          // aqui me llegan los que no han sido creados porque el backend los ha rechazado
          // por ende hay que borrarlos de la indexe
          this.indexedDBCacheService.bulkDelete(data)
        );
    } catch (e) {
      this.queues.CREATE = [...this.queues.CREATE, oldQueue];
      console.info(
        'Aun no se puede conectar con el backend... reintentando...'
      );
      console.error(e);
    }
  }

  private offline() {
    console.info('switching offline mode...');
  }

  public addToQueue(queue: string, element: any) {
    this.queues[queue].push(element);
    console.log('datos en las colas');
    console.table(this.queues);
  }
}
