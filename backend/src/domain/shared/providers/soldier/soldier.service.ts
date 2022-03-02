import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {SoldierEntity} from "../../entities/soldier.entity";

@Injectable()
export class SoldierService {
    public constructor(
        @Inject("SOLDIER_REPOSITORY")
        private readonly soldierRepository: Repository<SoldierEntity>
    ) {
    }

    public findAll(): Promise<SoldierEntity[]>{
        return this.soldierRepository.find();
    }

    public new(soldierEntity: SoldierEntity): Promise<SoldierEntity>{
        return this.soldierRepository.save(soldierEntity);
    }
}
