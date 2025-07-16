import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundServicesController } from './background-services.controller';

describe('BackgroundServicesController', () => {
  let controller: BackgroundServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundServicesController],
    }).compile();

    controller = module.get<BackgroundServicesController>(BackgroundServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
