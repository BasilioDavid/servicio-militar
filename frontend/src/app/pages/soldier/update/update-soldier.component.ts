import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/modules/soldier/soldier.repository';
import { HighAvailabilityService } from '../../../shared/modules/high-availability/high-availability.service';
import { environment } from '../../../../environments/environment';
import { Soldier } from '../../../shared/modules/soldier/soldier.interface';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-update-soldiers',
  template: ` <app-form-soldiers
    [editable]="true"
    (onSubmit)="this.submit($event)"
    [data$]="soldier2Delete$"
  ></app-form-soldiers>`,
})
export class UpdateSoldierComponent implements OnInit {
  private _soldier2Delete$ = new ReplaySubject<Soldier>();

  public get soldier2Delete$() {
    return this._soldier2Delete$.asObservable();
  }

  constructor(
    private readonly soldierRepository: SoldierRepository,
    private readonly highAvailabilityService: HighAvailabilityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id');
      if (!id) {
        this.router.navigate(['/soldiers']);
        return;
      }
      this.findAndEmitSoldier(id);
    });
  }

  private findAndEmitSoldier(id: string) {
    this.soldierRepository.soldiers$.subscribe((soldiers) => {
      if (soldiers.length)
        this._soldier2Delete$.next(soldiers.find(({ id: _id }) => _id === id));
    });
  }

  ngOnInit(): void {}

  public submit(soldier: Soldier) {
    const addToUpdateQueue = () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.UPDATE,
        soldier
      );
    };
    this.soldierRepository.update(soldier, addToUpdateQueue);
    this.router.navigate(['/soldiers/list']);
  }
}
