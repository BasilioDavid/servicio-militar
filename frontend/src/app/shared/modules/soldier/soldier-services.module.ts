import { NgModule } from '@angular/core';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { SoldierStorage } from './soldier.storage';
import { SoldierRepository } from './soldier.repository';

@NgModule({
  imports: [FetchDataModule],
  providers: [SoldierStorage, SoldierRepository],
})
export class SoldierServicesModule {}
