import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSoldierComponent } from './new-soldier.component';

const routes: Routes = [
  {
    path: '',
    component: NewSoldierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSoldierRoutingModule {}
