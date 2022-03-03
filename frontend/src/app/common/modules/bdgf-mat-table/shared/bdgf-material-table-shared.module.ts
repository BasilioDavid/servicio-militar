import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    exports: [MatTableModule, MatSortModule, MatIconModule, MatPaginatorModule],
})
export class BdgfMaterialTableSharedModule {}
