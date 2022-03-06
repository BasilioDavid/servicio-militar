import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { Soldier } from '../../../shared/soldier.interface';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
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

  public async submit(values: any) {
    const soldier: Soldier = { ...values, id: uuidv4() };
    const addToCreateQueue = () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.CREATE,
        soldier
      );
    };
    await this.soldierRepository.create(soldier, addToCreateQueue);
    await this.router.navigate(['/soldiers/list']);
  }
}
