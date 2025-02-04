import { Test, TestingModule } from '@nestjs/testing';
import { FtpServerController } from './ftp-server.controller';

describe('FtpServerController', () => {
  let controller: FtpServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FtpServerController],
    }).compile();

    controller = module.get<FtpServerController>(FtpServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
