import {Injectable} from '@angular/core';
import {NetworkHandlerService} from '../common/services/networkHandler/networkHandler.service';
import {FetchDataService} from '../common/modules/fetch-data/fetch-data.service';
import {QueueRepository} from './repositories/queue.repository';

@Injectable({providedIn: 'root'})
export class HighAvailabilityService {
  private onBackendRefresh!: () => void;

  public constructor(
    private readonly networkHandlerService: NetworkHandlerService,
    private readonly fetchDataService: FetchDataService,
    private readonly queueRepository: QueueRepository
  ) {
    // TODO: poner algo para que se vaya haciendo no solo cuando
    //  esta online, sino tambien cada cierto tiempo
    this.networkHandlerService.addHandlerForEvent('online', () =>
      this.online()
    );
  }

  //TODO: ñapa rapida
  setOnBackedRefreshCallback(cb: () => void) {
    this.onBackendRefresh = cb;
  }

  private online() {
    console.info('switching online mode...');
    this.queueRepository.send().subscribe(
      this.onBackendRefresh,
      this.queueRepository.rollback
    );
  }

  public addToQueue(queue: string, element: any) {
    this.queueRepository.create(queue, element);
  }
}
