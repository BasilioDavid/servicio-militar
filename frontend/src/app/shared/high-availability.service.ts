import { Injectable } from '@angular/core';
import { NetworkHandlerService } from '../common/services/networkHandler/networkHandler.service';
import { FetchDataService } from '../common/modules/fetch-data/fetch-data.service';
import { QueueRepository } from './repositories/queue.repository';

@Injectable({ providedIn: 'root' })
export class HighAvailabilityService {
  public constructor(
    private readonly networkHandlerService: NetworkHandlerService,
    private readonly fetchDataService: FetchDataService,
    private readonly queueRepository: QueueRepository
  ) {
    this.networkHandlerService.addHandlerForEvent('online', () =>
      this.online()
    );
  }

  private online() {
    console.info('switching onlinen mode...');
    this.queueRepository.send();
  }

  public addToQueue(queue: string, element: any) {
    this.queueRepository.create(queue, element);
  }
}
