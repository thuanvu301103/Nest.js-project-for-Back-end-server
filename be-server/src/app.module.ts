import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScriptsModule } from './modules/scripts/scripts.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { FtpServerModule } from './modules/ftp-server/ftp-server.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Import ConfigModule at the root level
        DatabaseModule,
        ScriptsModule, UsersModule, FtpServerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
