import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Soldier } from '../../../shared/soldier.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-soldiers',
  templateUrl: './form-soldier.component.html',
  styleUrls: ['./form-soldier.component.scss'],
})
export class FormSoldierComponent implements OnInit {
  public form!: FormGroup;
  private soldier!: Soldier;

  @Input() editable!: boolean;
  @Input() data$?: Observable<Soldier>;
  @Output() onSubmit = new EventEmitter<any>();

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();
    const subs = this.data$?.subscribe((soldier) => {
      this.soldier = soldier;
      this.form.setValue({
        name: soldier.name,
        surname: soldier.surname,
        atGraduation: soldier.atGraduation,
      });
      // @ts-ignore
      subs.unsubscribe();
    });
  }

  private setForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(1)]],
      surname: ['', [Validators.minLength(1)]],
      atGraduation: ['', [Validators.minLength(1)]],
    });
  }

  public submit() {
    const soldierToEmit = this.soldier
      ? { id: this.soldier.id, ...this.form.value }
      : { ...this.form.value };
    if (this.form.valid) {
      this.onSubmit.emit(soldierToEmit);
    }
  }
}
