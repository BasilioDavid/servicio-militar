import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BdgfFormField } from './shared/bdgf-mat-forms-fields.interface';

@Component({
    selector: 'bdgf-mat-form',
    templateUrl: './bdgf-mat-form.component.html',
    styleUrls: ['./bdgf-mat-form.component.scss'],
})
export class BdgfMatFormComponent implements OnInit {
    @Input() formFields!: BdgfFormField[];
    @Input() isEditable!: boolean;

    @Output() onSend = new EventEmitter<any>();
    @Output() onCancel = new EventEmitter<void>();

    form!: FormGroup;

    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group(
            this.formFields.reduce(
                (acc, { id, initialValue, validators }) => ({
                    ...acc,
                    [id]: [initialValue, validators],
                }),
                {}
            )
        );
    }

    send() {
        if (this.form.valid) this.onSend.emit(this.form.value);
    }

    cancel() {
        this.onCancel.emit();
    }
}
