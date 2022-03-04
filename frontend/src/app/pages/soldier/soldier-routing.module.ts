import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./list/list-soldier.module').then((m) => m.ListSoldierModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./new/new-soldier.module').then((m) => m.NewSoldierModule),
  },
  {
    path: 'update',
    loadChildren: () =>
      import('./update/update-soldier.module').then(
        (m) => m.UpdateSoldierModule
      ),
  },
  {
    path: 'delete',
    loadChildren: () =>
      import('./delete/delete-soldier.module').then(
        (m) => m.DeleteSoldierModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./list/list-soldier.module').then((m) => m.ListSoldierModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoldierRoutingModule {}
