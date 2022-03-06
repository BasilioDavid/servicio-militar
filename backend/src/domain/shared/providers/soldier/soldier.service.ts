import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SoldierEntity } from '../../entities/soldier.entity';

@Injectable()
export class SoldierService {
  public constructor(
    @Inject('SOLDIER_REPOSITORY')
    private readonly soldierRepository: Repository<SoldierEntity>,
  ) {}

  public findAll(): Promise<SoldierEntity[]> {
    return this.soldierRepository.find();
  }

  public new(soldierEntity: SoldierEntity): Promise<SoldierEntity> {
    return this.soldierRepository.save(soldierEntity);
  }

  public delete(soldierid: string) {
    return this.soldierRepository.delete(soldierid);
  }

  public update(soldierEntity: SoldierEntity) {
    return this.soldierRepository.update(soldierEntity.id, soldierEntity);
  }

  public addMany(soldiers: SoldierEntity[]) {
    for (const soldier of soldiers) {
      this.new(soldier).catch();
    }
  }

  public deleteMany(soldiers: string[]) {
    for (const soldier of soldiers) {
      this.delete(soldier).catch();
    }
  }

  public editMany(soldiers: SoldierEntity[]) {
    for (const soldier of soldiers) {
      this.update(soldier).catch();
    }
  }
}
