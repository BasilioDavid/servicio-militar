import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/soldier.repository';

@Component({
  selector: 'app-new-soldiers',
  template: ` <app-form-soldiers
    [editable]="true"
    (onSubmit)="this.submit($event)"
  ></app-form-soldiers>`,
})
export class NewSoldierComponent implements OnInit {
  constructor(
    private readonly soldierRepository: SoldierRepository,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public submit(values: any) {
    this.soldierRepository.create(values);
    this.router.navigate(['/soldiers/list']);
  }
}
