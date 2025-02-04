import { Controller, Post, Body } from '@nestjs/common';
import { FtpServerService } from './ftp-server.service';

@Controller('ftp-server')
export class FtpServerController {
    constructor(private readonly ftpService: FtpServerService) { }

    @Post('upload')
    async uploadFile(@Body() body: { localPath: string; remotePath: string }) {
        const result = await this.ftpService.uploadFile(body.localPath, body.remotePath);
        return { message: result };
    }
}
