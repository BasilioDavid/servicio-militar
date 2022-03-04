import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteSoldierComponent } from './delete-soldier.component';

const routes: Routes = [
  {
    path: '',
    component: DeleteSoldierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteSoldierRoutingModule {}
