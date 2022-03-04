import {Component, OnInit} from '@angular/core';
import {SoldierRepository} from '../../../shared/repositories/soldier.repository';
import {HighAvailabilityService} from "../../../shared/high-availability.service";

@Component({
  selector: 'app-list-soldiers',
  templateUrl: './list-soldier.component.html',
  styleUrls: ['./list-soldier.component.scss'],
})
export class ListSoldierComponent implements OnInit {
  public soldiers$ = this.soldierRepository.soldiers$;

  constructor(private readonly soldierRepository: SoldierRepository,
              private readonly highAvailabilityService: HighAvailabilityService) {
  }

  ngOnInit(): void {
    this.highAvailabilityService.setOnBackedRefreshCallback(() => this.refresh());
  }

  refresh() {
    this.soldierRepository.reload();
  }
}
