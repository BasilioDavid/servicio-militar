import { NgModule } from '@angular/core';
import { SoldierRoutingModule } from './soldier-routing.module';
import { SoldierServicesModule } from '../../shared/modules/soldier/soldier-services.module';
import { HighAvailabilityModule } from '../../shared/modules/high-availability/high-availability.module';

@NgModule({
  imports: [
    SoldierRoutingModule,
    SoldierServicesModule,
    HighAvailabilityModule,
  ],
})
export class SoldierModule {}
