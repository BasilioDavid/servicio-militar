import { NgModule } from '@angular/core';
import { NewSoldierComponent } from './new-soldier.component';
import { NewSoldierRoutingModule } from './new-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { FormSoldierModule } from '../form/form-soldier.module';

@NgModule({
  declarations: [NewSoldierComponent],
  imports: [NewSoldierRoutingModule, FormSoldierModule, FetchDataModule],
  providers: [],
})
export class NewSoldierModule {}
