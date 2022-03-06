import { NgModule } from '@angular/core';
import { DeleteSoldierComponent } from './delete-soldier.component';
import { DeleteSoldierRoutingModule } from './delete-soldier-routing.module';
import { FetchDataModule } from '../../../common/modules/fetch-data/fetch-data.module';
import { FormSoldierModule } from '../form/form-soldier.module';

@NgModule({
  declarations: [DeleteSoldierComponent],
  imports: [DeleteSoldierRoutingModule, FormSoldierModule, FetchDataModule],
  providers: [],
})
export class DeleteSoldierModule {}
