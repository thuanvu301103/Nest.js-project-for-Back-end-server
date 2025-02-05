import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class FilesService {
    private ftpClient: ftp.Client;
    private ftpHost: string;
    private ftpUser: string;
    private ftpPassword: string;
    private ftpSecure: boolean;
    private ftpUploadDir: string;

    constructor(private readonly configService: ConfigService) {
        this.ftpClient = new ftp.Client();
        this.ftpClient.ftp.verbose = true; // Enable logs for debugging
        // Load FTP credentials from .env
        this.ftpHost = this.configService.get<string>('FTP_HOST');
        this.ftpUser = this.configService.get<string>('FTP_USER');
        this.ftpPassword = this.configService.get<string>('FTP_PASSWORD');
        this.ftpSecure = this.configService.get<boolean>('FTP_SECURE') || false;
        this.ftpUploadDir = this.configService.get<string>('FTP_UPLOAD_DIR') || '/uploads';
    }

    async connectToFTP() {
        await this.ftpClient.access({
            host: this.ftpHost,
            user: this.ftpUser,
            password: this.ftpPassword,
            secure: this.ftpSecure,
        });
        console.log(`✅ Connected to FTP: ${this.ftpHost}`);
    }

    async uploadFilesToFTP(files: Express.Multer.File[]) {
        try {
            await this.connectToFTP();

            // Ensure remote directory exists
            await this.ftpClient.ensureDir(this.ftpUploadDir);

            for (const file of files) {
                const localPath = path.join(process.cwd(), "../../uploads", file.filename);
                const remotePath = `${this.ftpUploadDir}/${file.originalname}`;

                // Upload file to FTP
                await this.ftpClient.uploadFrom(localPath, remotePath);
                console.log(`✅ Uploaded: ${file.originalname} to ${remotePath}`);

                // Delete local file after upload
                await fs.remove(localPath);
                console.log(`🗑️ Deleted local file: ${file.originalname}`);
            }

            this.ftpClient.close();
            console.log("✅ All files uploaded and deleted successfully");
        } catch (error) {
            console.error("❌ FTP Upload Error:", error);
            this.ftpClient.close();
            throw new Error("FTP Upload Failed");
        }
    }
}