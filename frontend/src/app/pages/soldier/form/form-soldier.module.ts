import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSoldierComponent } from './form-soldier.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormSoldierComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormSoldierComponent],
})
export class FormSoldierModule {}
