import { Component, OnInit, Self } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/modules/soldier/soldier.repository';
import { Soldier } from '../../../shared/modules/soldier/soldier.interface';
import { HighAvailabilityService } from '../../../shared/modules/high-availability/high-availability.service';
import { environment } from '../../../../environments/environment';

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
    private readonly highAvailabilityService: HighAvailabilityService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public submit(values: any) {
    const soldier: Soldier = { ...values, id: uuidv4() };
    const addToCreateQueue = () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.CREATE,
        soldier
      );
    };
    this.soldierRepository.create(soldier, addToCreateQueue);
    this.router.navigate(['/soldiers/list']);
  }
}
