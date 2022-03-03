import { NgModule } from "@angular/core";
import { BdgfMatFormComponent } from "./bdgf-mat-form.component";
import { BdgfMaterialFormsSharedModule } from "./shared/bdgf-mat-forms-shared.module";

@NgModule({
	declarations: [BdgfMatFormComponent],
	imports: [BdgfMaterialFormsSharedModule],
	exports: [BdgfMatFormComponent],
})
export class  BdgfMatFormModule{}