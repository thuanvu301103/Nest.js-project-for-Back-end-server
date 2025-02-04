import { Test, TestingModule } from '@nestjs/testing';
import { FtpServerService } from './ftp-server.service';

describe('FtpServerService', () => {
  let service: FtpServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FtpServerService],
    }).compile();

    service = module.get<FtpServerService>(FtpServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
