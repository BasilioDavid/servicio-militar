import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSoldierComponent } from './list-soldier.component';
import { ListSoldierRoutingModule } from './list-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { SoldierStorage } from '../../../shared/storages/soldier.storage';
import { QueueRepository } from '../../../shared/repositories/queue.repository';
import { QueueStorage } from '../../../shared/storages/queues/queue.storage';
import { CreateQueueStorage } from '../../../shared/storages/queues/create-queue.storage';
import { DeleteQueueStorage } from '../../../shared/storages/queues/delete-queue.storage';
import { UpdateQueueStorage } from '../../../shared/storages/queues/update-queue.storage';

@NgModule({
  declarations: [ListSoldierComponent],
  imports: [ListSoldierRoutingModule, CommonModule, FetchDataModule],
  providers: [
    HighAvailabilityService,
    SoldierRepository,
    SoldierStorage,
    QueueRepository,
    QueueStorage,
    CreateQueueStorage,
    DeleteQueueStorage,
    UpdateQueueStorage,
  ],
})
export class ListSoldierModule {}
