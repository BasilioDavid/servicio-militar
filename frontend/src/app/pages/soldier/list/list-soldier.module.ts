import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSoldierComponent } from './list-soldier.component';
import { ListSoldierRoutingModule } from './list-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { SoldierRepository } from '../../../shared/modules/soldier/soldier.repository';
import { SoldierStorage } from '../../../shared/modules/soldier/soldier.storage';
import { QueueRepository } from '../../../shared/repositories/queue.repository';
import { QueueStorage } from '../../../shared/storages/queues/queue.storage';
import { CreateQueueStorage } from '../../../shared/storages/queues/create-queue.storage';
import { DeleteQueueStorage } from '../../../shared/storages/queues/delete-queue.storage';
import { UpdateQueueStorage } from '../../../shared/storages/queues/update-queue.storage';
import { SoldierServicesModule } from '../../../shared/modules/soldier/soldier-services.module';

@NgModule({
  declarations: [ListSoldierComponent],
  imports: [
    ListSoldierRoutingModule,
    CommonModule,
    FetchDataModule,
    // SoldierServicesModule,
  ],
  providers: [
    HighAvailabilityService,
    QueueRepository,
    QueueStorage,
    CreateQueueStorage,
    DeleteQueueStorage,
    UpdateQueueStorage,
  ],
})
export class ListSoldierModule {}
