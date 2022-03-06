import { NgModule } from '@angular/core';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { HighAvailabilityService } from './high-availability.service';
import { QueueStorage } from './queues/queue.storage';
import { QueueRepository } from './queues/queue.repository';
import { SoldierServicesModule } from '../soldier/soldier-services.module';

@NgModule({
  imports: [FetchDataModule, SoldierServicesModule],
  providers: [HighAvailabilityService, QueueStorage, QueueRepository],
})
export class HighAvailabilityModule {}
