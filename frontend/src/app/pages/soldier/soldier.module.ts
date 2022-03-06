import { NgModule } from '@angular/core';
import { SoldierRoutingModule } from './soldier-routing.module';
import { SoldierServicesModule } from '../../shared/modules/soldier/soldier-services.module';

@NgModule({
  imports: [SoldierRoutingModule, SoldierServicesModule],
})
export class SoldierModule {}
