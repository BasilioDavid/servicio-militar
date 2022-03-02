import { Test, TestingModule } from '@nestjs/testing';
import { ArmyCorpsController } from './army-corps.controller';

describe('ArmyCorpsController', () => {
  let controller: ArmyCorpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmyCorpsController],
    }).compile();

    controller = module.get<ArmyCorpsController>(ArmyCorpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
