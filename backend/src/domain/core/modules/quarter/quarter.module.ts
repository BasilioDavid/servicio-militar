import { Module } from '@nestjs/common';
import { QuarterController } from './quarter.controller';

@Module({
  controllers: [QuarterController]
})
export class QuarterModule {}
