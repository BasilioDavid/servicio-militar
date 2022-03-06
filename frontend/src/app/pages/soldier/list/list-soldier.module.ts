import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSoldierComponent } from './list-soldier.component';
import { ListSoldierRoutingModule } from './list-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';

@NgModule({
  declarations: [ListSoldierComponent],
  imports: [ListSoldierRoutingModule, CommonModule, FetchDataModule],
  providers: [],
})
export class ListSoldierModule {}
