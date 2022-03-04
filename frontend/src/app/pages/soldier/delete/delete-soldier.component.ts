import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { environment } from '../../../../environments/environment';
import { Soldier } from '../../../shared/soldier.interface';

@Component({
  selector: 'app-delete-soldiers',
  template: ` <app-form-soldiers
    [editable]="true"
    (onSubmit)="this.submit($event)"
  ></app-form-soldiers>`,
})
export class DeleteSoldierComponent implements OnInit {
  constructor(
    private readonly soldierRepository: SoldierRepository,
    private readonly highAvailabilityService: HighAvailabilityService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public submit(values: any) {
    const soldier: Soldier = { ...values };
    const addToDeleteQueue = () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.DELETE,
        soldier
      );
    };
    this.soldierRepository.delete(values, addToDeleteQueue);
    this.router.navigate(['/soldiers/list']);
  }
}
