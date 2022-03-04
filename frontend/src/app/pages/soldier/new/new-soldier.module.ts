import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSoldierComponent } from './new-soldier.component';
import { NewSoldierRoutingModule } from './new-soldier-routing.module';
import { FetchDataService } from '../../../common/modules/fetch-data/fetch-data.service';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { FormSoldierModule } from '../form/form-soldier.module';
import { SoldierStorage } from '../../../shared/storages/soldier.storage';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { HighAvailabilityService } from '../../../shared/high-availability.service';

@NgModule({
  declarations: [NewSoldierComponent],
  imports: [NewSoldierRoutingModule, FormSoldierModule, FetchDataModule],
  providers: [SoldierStorage, SoldierRepository, HighAvailabilityService],
})
export class NewSoldierModule {}
