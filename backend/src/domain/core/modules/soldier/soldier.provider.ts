import { Connection } from 'typeorm';
import {SoldierEntity} from "../../../shared/entities/soldier.entity";

export const soldierProviders = [
  {
    provide: 'SOLDIER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(SoldierEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
