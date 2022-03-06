import { Injectable } from '@angular/core';
import { NetworkHandlerService } from '../../../common/services/networkHandler/networkHandler.service';
import { FetchDataService } from '../../../common/modules/fetch-data/fetch-data.service';
import { QueueRepository } from './queues/queue.repository';
import { SoldierRepository } from '../soldier/soldier.repository';

@Injectable({ providedIn: 'root' })
export class HighAvailabilityService {
  private onBackendRefresh!: () => void;

  public constructor(
    private readonly networkHandlerService: NetworkHandlerService,
    private readonly fetchDataService: FetchDataService,
    private readonly queueRepository: QueueRepository,
    private readonly soldierRepository: SoldierRepository
  ) {
    // TODO: poner algo para que se vaya haciendo no solo cuando
    //  esta online, sino tambien cada cierto tiempo
    this.networkHandlerService.addHandlerForEvent('online', () =>
      this.online()
    );
  }

  private online() {
    const onSended = () => {
      this.soldierRepository.reload();
    };
    console.info('switching online mode...');
    this.queueRepository.send(onSended);
  }

  public addToQueue(queue: string, element: any) {
    this.queueRepository.create(queue, element);
  }
}
