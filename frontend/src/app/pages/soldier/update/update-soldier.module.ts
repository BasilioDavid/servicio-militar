import { NgModule } from '@angular/core';
import { UpdateSoldierComponent } from './update-soldier.component';
import { UpdateSoldierRoutingModule } from './update-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { FormSoldierModule } from '../form/form-soldier.module';

@NgModule({
  declarations: [UpdateSoldierComponent],
  imports: [UpdateSoldierRoutingModule, FormSoldierModule, FetchDataModule],
  providers: [],
})
export class UpdateSoldierModule {}
