import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs-extra';
import { FilesService } from './files.service';

const storage = multer.diskStorage({
    destination: './uploads', // Temporary folder
    filename: (req, file, cb) => cb(null, file.originalname),
});

@Controller('files')
export class FilesController {
    constructor(private readonly ftpService: FilesService) { }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 50, { storage }))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) throw new Error('No files uploaded');

        await this.ftpService.uploadFilesToFTP(files);

        return { message: 'Files uploaded successfully to FTP' };
    }
}
