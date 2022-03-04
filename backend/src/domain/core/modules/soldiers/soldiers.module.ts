import { Module } from '@nestjs/common';
import { SoldiersController } from './soldiers.controller';
import { DatabaseModule } from '../../../../common/database/database.module';
import { SoldierService } from '../../../shared/providers/soldier/soldier.service';
import { soldierProviders } from './soldiers.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SoldiersController],
  providers: [SoldierService, ...soldierProviders],
})
export class SoldiersModule {}
