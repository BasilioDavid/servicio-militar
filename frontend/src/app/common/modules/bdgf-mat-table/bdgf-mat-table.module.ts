import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BdgfMatTable } from './bdgf-mat-table.component';
import { BdgfMaterialTableSharedModule } from './shared/bdgf-material-table-shared.module';

@NgModule({
    declarations: [BdgfMatTable],
    imports: [CommonModule, BdgfMaterialTableSharedModule],
    exports: [BdgfMatTable, BdgfMaterialTableSharedModule],
})
export class BdgfMatTableModule {}
