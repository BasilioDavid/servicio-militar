import { environment } from '../../../../environments/environment';
import { FetchDataService } from '../../../common/modules/fetch-data/fetch-data.service';
import { SoldierStorage } from './soldier.storage';
import { Soldier } from './soldier.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapArrayIntoMap } from '../../../common/helpers/bdgf.helpers';

@Injectable()
export class SoldierRepository {
  private soldiers!: { [soldierID: string]: Soldier };

  private _soldiers$ = new BehaviorSubject<Soldier[]>([]);

  public get soldiers$(): Observable<Soldier[]> {
    return this._soldiers$.asObservable();
  }

  constructor(
    private readonly fetchDataService: FetchDataService,
    private readonly soldierStorage: SoldierStorage
  ) {
    this.reload();
  }

  public async reload() {
    this.soldiers = mapArrayIntoMap(await this.getValuesFromIndexedDB());
    this.sendSoldiers();
    this.requestSoldiersToBackend().subscribe(
      (soldiers) => this.manageBackendValues(soldiers),
      () => {
        console.error('no se ha podido comunicar con el backend');
      }
    );
  }

  private getValuesFromIndexedDB() {
    return this.soldierStorage.findAll();
  }

  private sendSoldiers() {
    this._soldiers$.next(this.getSoldiersArray());
  }

  private getSoldiersArray() {
    return Object.values({ ...this.soldiers });
  }

  private manageBackendValues(soldiers: Soldier[]) {
    this.soldiers = mapArrayIntoMap(soldiers);
    this.sendSoldiers();
    this.soldierStorage.deleteAll();
    this.soldierStorage.bulkAdd(this.getSoldiersArray());
  }

  private requestSoldiersToBackend() {
    return this.fetchDataService.get<Soldier[]>(environment.SOLDIERS_ENDPOINT);
  }

  public async create(soldier: Soldier, onErrorCB: (soldier: Soldier) => void) {
    this.soldiers[soldier.id] = { ...soldier };
    this.sendSoldiers();
    await this.saveValuesInIndexedDB(soldier);
    this.sendSoldierToBackend(soldier).subscribe(
      this.handleBackendResponse(soldier),
      onErrorCB
    );
  }

  private saveValuesInIndexedDB(soldier: Soldier) {
    return this.soldierStorage.add(soldier);
  }

  private sendSoldierToBackend(soldier: Soldier) {
    return this.fetchDataService.post<string>(
      environment.SOLDIERS_ENDPOINT,
      soldier
    );
  }

  private handleBackendResponse(soldier: Soldier) {
    return (response: string) => {
      if (response === '409') this.rollback(soldier);
    };
  }

  private rollback(soldier: Soldier) {
    delete this.soldiers[soldier.id];
    this.sendSoldiers();
    // TODO: enviar una notificacion que el soldado no se ha podido añadir por algun motivo
  }

  public async delete(id: string, onErrorCB: (soldier: Soldier) => void) {
    const soldier2Delete = { ...this.soldiers[id] };
    delete this.soldiers[id];
    this.sendSoldiers();
    await this.deleteFromIndexedDB(id);
    this.deleteFromBackend(id).subscribe(
      this.handleBackendResponseOnDelete(soldier2Delete),
      onErrorCB
    );
  }

  private deleteFromIndexedDB(id: string) {
    return this.soldierStorage.deleteOne(id);
  }

  private deleteFromBackend(id: string) {
    return this.fetchDataService.delete<string>(
      environment.SOLDIERS_ENDPOINT + '/' + id
    );
  }

  private handleBackendResponseOnDelete(soldier: Soldier) {
    return (response: string) => {
      if (response === '402') this.rollbackOnDelete(soldier);
    };
  }

  private rollbackOnDelete(soldier: Soldier) {
    this.soldiers[soldier.id] = soldier;
    this.sendSoldiers();
    // TODO: enviar una notificacion que el soldado no se ha podido añadir por algun motivo
  }
}
