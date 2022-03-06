import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteSoldierComponent } from './delete-soldier.component';
import { DeleteSoldierRoutingModule } from './delete-soldier-routing.module';
import { FetchDataService } from '../../../common/modules/fetch-data/fetch-data.service';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { FormSoldierModule } from '../form/form-soldier.module';
import { SoldierStorage } from '../../../shared/modules/soldier/soldier.storage';
import { SoldierRepository } from '../../../shared/modules/soldier/soldier.repository';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { QueueRepository } from '../../../shared/repositories/queue.repository';
import { QueueStorage } from '../../../shared/storages/queues/queue.storage';
import { CreateQueueStorage } from '../../../shared/storages/queues/create-queue.storage';
import { DeleteQueueStorage } from '../../../shared/storages/queues/delete-queue.storage';
import { UpdateQueueStorage } from '../../../shared/storages/queues/update-queue.storage';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  declarations: [DeleteSoldierComponent],
  imports: [DeleteSoldierRoutingModule, FormSoldierModule, FetchDataModule],
  providers: [
    SoldierStorage,
    SoldierRepository,
    HighAvailabilityService,
    //queue
    QueueRepository,
    QueueStorage,
    CreateQueueStorage,
    DeleteQueueStorage,
    UpdateQueueStorage,
  ],
})
export class DeleteSoldierModule {}
