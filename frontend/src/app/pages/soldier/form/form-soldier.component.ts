import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Soldier } from '../../../shared/soldier.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-soldiers',
  templateUrl: './form-soldier.component.html',
  styleUrls: ['./form-soldier.component.scss'],
})
export class FormSoldierComponent implements OnInit {
  form = this.formBuilder.group({
    name: [this.data?.name ?? '', [Validators.minLength(1)]],
    surname: [this.data?.surname ?? '', [Validators.minLength(1)]],
    atGraduation: [this.data?.atGraduation ?? '', [Validators.minLength(1)]],
  });

  @Input() editable!: boolean;
  @Input() data?: Soldier;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  public submit() {
    if (this.form.valid) this.onSubmit.emit(this.form.value);
  }
}
