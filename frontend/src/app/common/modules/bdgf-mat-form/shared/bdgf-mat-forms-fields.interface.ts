import { ValidatorFn } from '@angular/forms';

export interface BdgfFormField {
    id: string;
    name: string;
    type: string;
    validators: ValidatorFn[];
    initialValue: string;
    isEditable: boolean;
};
