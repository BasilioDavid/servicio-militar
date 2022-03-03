import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSoldierComponent } from './list-soldier.component';

const routes: Routes = [
  {
    path: '',
    component: ListSoldierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSoldierRoutingModule {}
