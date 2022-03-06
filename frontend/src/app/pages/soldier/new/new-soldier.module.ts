import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSoldierComponent } from './new-soldier.component';
import { NewSoldierRoutingModule } from './new-soldier-routing.module';
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
import { SoldierServicesModule } from '../../../shared/modules/soldier/soldier-services.module';

@NgModule({
  declarations: [NewSoldierComponent],
  imports: [
    NewSoldierRoutingModule,
    FormSoldierModule,
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
export class NewSoldierModule {}
