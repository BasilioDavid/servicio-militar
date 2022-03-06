import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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

  @Post('mass')
  private mass(@Body() soldiers: { [queue: string]: SoldierDTO[] }) {
    // cambiar ese string a pelocho a un environ
    let soldiers2Create: SoldierEntity[] = [];
    for (const soldier of soldiers['create']) {
      const soldierEntity = new SoldierEntity();
      soldierEntity.fromDTO(soldier);
      soldiers2Create = [...soldiers2Create, soldierEntity];
    }
    let soldiers2Update: SoldierEntity[] = [];
    for (const soldier of soldiers['update']) {
      const soldierEntity = new SoldierEntity();
      soldierEntity.fromDTO(soldier);
      soldiers2Update = [...soldiers2Update, soldierEntity];
    }
    let soldiers2Delete: string[] = [];
    for (const { id } of soldiers['delete']) {
      soldiers2Delete = [...soldiers2Delete, id];
    }
  }

  @Delete(':id')
  private delete(@Param('id') id: string, @Res() response: Response) {
    this.soldierService.delete(id).then(() => response.send('201'));
  }
}
