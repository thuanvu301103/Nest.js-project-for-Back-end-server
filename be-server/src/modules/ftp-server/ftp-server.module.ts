import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FtpModule } from 'nestjs-ftp';
import { FtpServerService } from './ftp-server.service';
import { FtpServerController } from './ftp-server.controller';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
        FtpModule.forRootFtpAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                host: configService.get<string>('FTP_HOST'),
                port: configService.get<number>('FTP_PORT'),
                user: configService.get<string>('FTP_USER'),
                password: configService.get<string>('FTP_PASSWORD'),
            }),
        }),
    ],
    controllers: [FtpServerController],
    providers: [FtpServerService],
})
export class FtpServerModule { }
