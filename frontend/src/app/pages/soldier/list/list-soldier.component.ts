import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SoldierRepository } from '../../../shared/repositories/soldier.repository';
import { HighAvailabilityService } from '../../../shared/high-availability.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-soldiers',
  templateUrl: './list-soldier.component.html',
  styleUrls: ['./list-soldier.component.scss'],
})
export class ListSoldierComponent implements OnInit, AfterContentChecked {
  public soldiers$ = this.soldierRepository.soldiers$;

  constructor(
    private readonly soldierRepository: SoldierRepository,
    private readonly highAvailabilityService: HighAvailabilityService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.highAvailabilityService.setOnBackedRefreshCallback(() => {
      this.refresh();
    });
    this.soldierRepository.soldiers$.subscribe((d) => {
      console.log(d);
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  refresh() {
    this.soldierRepository.reload();
  }
}
