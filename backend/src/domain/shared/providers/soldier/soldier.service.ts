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
    for (const soldier of soldiers) {
      try {
        await this.new(soldier);
      } catch (e) {
        console.log('Error adding: ', e);
      }
    }
  }

  public async deleteMany(soldiers: SoldierEntity[]) {
    for (const soldier of soldiers) {
      try {
        await this.delete(soldier.id).catch();
      } catch (e) {
        console.log('Error adding: ', e);
      }
    }
  }

  public async editMany(soldiers: SoldierEntity[]) {
    for (const soldier of soldiers) {
      try {
        await this.update(soldier).catch();
      } catch (e) {
        console.log('Error adding: ', e);
      }
    }
  }
}
