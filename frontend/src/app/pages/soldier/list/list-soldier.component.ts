import { Component, OnInit } from '@angular/core';
import { SoldierRepository } from '../../../shared/soldier.repository';

@Component({
  selector: 'app-soldiers',
  templateUrl: './list-soldier.component.html',
  styleUrls: ['./list-soldier.component.scss'],
})
export class ListSoldierComponent implements OnInit {
  public soldiers$ = this.soldierRepository.soldiers$;

  constructor(private readonly soldierRepository: SoldierRepository) {}

  ngOnInit(): void {}
}
