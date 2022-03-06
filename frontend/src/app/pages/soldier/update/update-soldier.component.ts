import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { ReplaySubject } from 'rxjs';
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
    this.route.paramMap.subscribe(async (data) => {
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
    const addToDeleteQueue = () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.DELETE,
        soldier
      );
    };
    this.soldierRepository.delete(soldier.id, addToDeleteQueue);
    this.router.navigate(['/soldiers/list']);
  }
}
