import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSoldierComponent } from './list-soldier.component';
import { ListSoldierRoutingModule } from './list-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { SoldierStorage } from '../../../shared/storages/soldier.storage';

@NgModule({
  declarations: [ListSoldierComponent],
  imports: [ListSoldierRoutingModule, CommonModule, FetchDataModule],
  providers: [HighAvailabilityService, SoldierRepository, SoldierStorage],
})
export class ListSoldierModule {}
