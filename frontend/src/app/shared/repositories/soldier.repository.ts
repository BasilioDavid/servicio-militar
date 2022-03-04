import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environments/environment';
import { FetchDataService } from '../../common/modules/fetch-data/fetch-data.service';
import { SoldierStorage } from '../storages/soldier.storage';
import { Soldier } from '../soldier.interface';
import { HighAvailabilityService } from '../high-availability.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SoldierRepository {
  private soldiers!: { [soldierID: string]: Soldier };

  private _soldiers$ = new BehaviorSubject<Soldier[]>([]);

  public get soldiers$() {
    return this._soldiers$.asObservable();
  }

  constructor(
    private readonly fetchDataService: FetchDataService,
    private readonly soldierStorage: SoldierStorage,
    private readonly highAvailabilityService: HighAvailabilityService
  ) {
    this.reload();
  }

  public async reload() {
    this.soldiers = this.mapArrayIntoMap(await this.getValuesFromIndexedDB());
    this.sendSoldiers();
    this.requestSoldiersToBackend().subscribe(
      (soldiers) => this.manageBackendValues(soldiers),
      () => {
        console.error('no se ha podido comunicar con el backend');
      }
    );
  }

  // Esto es tan generico que tendría que sacarlo a una funcion helper
  private mapArrayIntoMap(values: { id: string }[]) {
    return values.reduce(
      (acc, soldier) => ({
        ...acc,
        [soldier.id]: soldier,
      }),
      {}
    );
  }

  private getValuesFromIndexedDB() {
    return this.soldierStorage.findAll();
  }

  private sendSoldiers() {
    this._soldiers$.next(this.getSoldiersArray());
  }

  private getSoldiersArray() {
    return Object.values(this.soldiers);
  }

  private manageBackendValues(soldiers: Soldier[]) {
    this.soldiers = this.mapArrayIntoMap(soldiers);
    this.sendSoldiers();
    this.soldierStorage.deleteAll();
    this.soldierStorage.bulkAdd(this.getSoldiersArray());
  }

  private requestSoldiersToBackend() {
    return this.fetchDataService.get<Soldier[]>(environment.SOLDIERS_ENDPOINT);
  }

  //TODO: ver si puedo eliminar el soldier en todos los metodos con un atributo de clase
  // o algo así
  public async create(values: any) {
    const soldier: Soldier = { ...values, id: uuidv4() };
    this.soldiers = { ...this.soldiers, [soldier.id]: { ...soldier } };
    try {
      await this.saveValuesInIndexedDB(soldier);
    } catch (e) {
      // second try
      console.warn('Duplicated id???');
      delete this.soldiers[soldier.id];
      soldier.id = uuidv4();
      this.soldiers = { ...this.soldiers, [soldier.id]: { ...soldier } };
      await this.saveValuesInIndexedDB(soldier);
    }
    this.sendSoldierToBackend(soldier).subscribe(
      this.handleBackendResponse(soldier),
      this.addSoldierCreationIntoQueue(soldier)
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
      if (response === '201') return;
      if (response === '409') this.rollback(soldier);
    };
  }

  private rollback(soldier: Soldier) {
    delete this.soldiers[soldier.id];
    // TODO: enviar una notificacion que el soldado no se ha podido añadir por algun motivo
  }

  private addSoldierCreationIntoQueue(soldier: Soldier) {
    return () => {
      this.highAvailabilityService.addToQueue(
        environment.QUEUES.CREATE,
        soldier
      );
    };
  }
}
