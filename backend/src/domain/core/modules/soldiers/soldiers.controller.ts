import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SoldierService } from '../../../shared/providers/soldier/soldier.service';
import { SoldierDTO } from '../../../shared/models/DTOs/soldier.dto';
import { SoldierEntity } from '../../../shared/entities/soldier.entity';
import { SoldierWithQueueDto } from '../../../shared/models/DTOs/soldier-with-queue.dto';

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
    const soldierEntity = SoldierEntity.fromDTO(soldier);
    return this.soldierService.new(soldierEntity);
  }

  @Post('mass')
  private async mass(@Body() soldiers: SoldierWithQueueDto[]) {
    console.log('Data arrived: ', soldiers);
    const soldiersTo = this.getSoldiersSeparatedByQueue(soldiers);
    console.log('Data proccessed: ', soldiersTo);
    // quick solution
    await this.soldierService.addMany(soldiersTo.create);
    await this.soldierService.editMany(soldiersTo.update);
    await this.soldierService.deleteMany(soldiersTo.delete);
  }

  private getSoldiersSeparatedByQueue(soldiers: SoldierWithQueueDto[]) {
    return soldiers.reduce(
      (
        soldiersSeparatedByQueue: {
          create: SoldierEntity[];
          update: SoldierEntity[];
          delete: SoldierEntity[];
        },
        soldier,
      ) => ({
        ...soldiersSeparatedByQueue,
        [soldier.queue]: [
          ...soldiersSeparatedByQueue[soldier.queue],
          SoldierEntity.fromDTO({ ...soldier }),
        ],
      }),
      {
        create: [],
        update: [],
        delete: [],
      },
    );
  }

  @Delete(':id')
  private delete(@Param('id') id: string, @Res() response: Response) {
    this.soldierService.delete(id).then(() => response.send('201'));
  }

  @Patch('')
  private patch(@Body() soldier: SoldierDTO) {
    const soldierEntity = SoldierEntity.fromDTO(soldier);
    this.soldierService.update(soldierEntity);
  }
}
