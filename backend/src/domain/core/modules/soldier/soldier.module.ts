import { Module } from '@nestjs/common';
import { SoldierController } from './soldier.controller';
import {DatabaseModule} from "../../../../common/database/database.module";
import {SoldierService} from "../../../shared/providers/soldier/soldier.service";
import {soldierProviders} from "./soldier.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [SoldierController],
  providers: [SoldierService, ...soldierProviders],
})
export class SoldierModule {}
