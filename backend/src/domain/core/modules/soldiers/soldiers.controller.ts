import { Body, Controller, Get, Post } from '@nestjs/common';
import { SoldierService } from '../../../shared/providers/soldier/soldier.service';
import { SoldierDTO } from '../../../shared/models/DTOs/soldier.dto';
import { SoldierEntity } from '../../../shared/entities/soldier.entity';

@Controller('soldiers')
export class SoldiersController {
  constructor(private readonly soldierService: SoldierService) {}

  @Get('')
  // esto tiene que ser soldiers dto[]
  private findAll(): Promise<SoldierEntity[]> {
    const soldiers = this.soldierService.findAll();
    return soldiers;
  }

  @Post('')
  // esto tiene que ser soldiers dto
  private create(@Body() soldier: SoldierDTO): Promise<SoldierEntity> {
    const soldierEntity = new SoldierEntity();
    soldierEntity.fromDTO(soldier);
    return this.soldierService.new(soldierEntity);
  }
}
