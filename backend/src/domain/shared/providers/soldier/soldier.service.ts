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

  public async addMany(soldiers: SoldierEntity[]) {
    let idsFailed = [];
    for (const soldier of soldiers) {
      try {
        await this.new(soldier);
      } catch (e) {
        idsFailed = [...idsFailed, soldier.id];
      }
    }
  }

  public async deleteMany(soldiers: string[]) {
    let idsFailed = [];
    for (const soldier of soldiers) {
      try {
        await this.delete(soldier);
      } catch (e) {
        idsFailed = [...idsFailed, soldier];
      }
    }
  }

  public editMany(soldiers: SoldierEntity[]) {}
}
