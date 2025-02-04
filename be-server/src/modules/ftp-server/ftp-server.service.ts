import { Injectable } from '@nestjs/common';
import { FtpService as NestFtpService } from 'nestjs-ftp';

@Injectable()
export class FtpServerService {
    constructor(private readonly ftpService: NestFtpService) { }

    async uploadFile(localPath: string, remotePath: string): Promise<string> {
        try {
            await this.ftpService.upload(localPath, remotePath);
            return 'File uploaded successfully';
        } catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }
}
