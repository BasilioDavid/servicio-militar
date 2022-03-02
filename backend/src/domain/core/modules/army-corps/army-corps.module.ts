import { Module } from '@nestjs/common';
import { ArmyCorpsController } from './army-corps.controller';

@Module({
  controllers: [ArmyCorpsController]
})
export class ArmyCorpsModule {}
