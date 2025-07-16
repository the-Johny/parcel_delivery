import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundServicesService } from './background-services.service';

describe('BackgroundServicesService', () => {
  let service: BackgroundServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundServicesService],
    }).compile();

    service = module.get<BackgroundServicesService>(BackgroundServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
