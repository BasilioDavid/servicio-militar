import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateSoldierComponent } from './update-soldier.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateSoldierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSoldierRoutingModule {}
