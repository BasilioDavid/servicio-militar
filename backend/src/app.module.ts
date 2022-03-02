import { Module } from '@nestjs/common';
import { SoldierModule } from './domain/core/modules/soldier/soldier.module';
import { ArmyCorpsModule } from './domain/core/modules/army-corps/army-corps.module';
import { QuarterModule } from './domain/core/modules/quarter/quarter.module';
import { CompanyModule } from './domain/core/modules/company/company.module';
import { ServiceModule } from './domain/core/modules/service/service.module';
import { AuthModule } from './domain/core/modules/auth/auth.module';

@Module({
  imports: [SoldierModule, ArmyCorpsModule, QuarterModule, CompanyModule, ServiceModule, AuthModule],
})
export class AppModule {}
