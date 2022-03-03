import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSoldierComponent } from './list-soldier.component';
import { ListSoldierRoutingModule } from './list-soldier-routing.module';

@NgModule({
  declarations: [ListSoldierComponent],
  imports: [ListSoldierRoutingModule, CommonModule],
})
export class ListSoldierModule {}
