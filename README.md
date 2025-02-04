# Nest.js-project-for-Back-end-server
A simple NestJS project for Back-end Server

## Initial a Nest.js project
Follow these steps:
- Step 1 - Install `Node.js` and `npm`: Make sure you have `Node.js` and `npm` (Node Package Manager) installed on your machine
- Step 2 - Install `NestJS CLI`: Install the `NestJS CLI` globally using `npm`
```bash
npm install -g @nestjs/cli
```
- Step 3 - Create a New Project: Create a new NestJS project using the CLI
```bash
nest new project-name
```
Navigate to the project directory
- Step 4 - Create a Module: Generate a new module (e.g. `scripts` module)
```bash
nest generate module scripts
```
- Step 5 - Create a Controller: Generate a new controller for the module
```bash 
nest generate controller scripts
```
- Step 6 - Create a Service: Generate a new service for the module
```bash
nest generate service scripts
```

## Update created files
- Step 1 - Define the Controller: Edit the generated controller file (`scripts.controller.ts`) to define the routes and handlers:
```typescript
import {Controller, Get} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    return this.catsService.findAll();
  }}
```

- Step 2 - Define the Service: Edit the generated service file (`scripts.service.ts`) to implement the business logic
```typescript
import { Injectable } from '@nestjs/common';
@Injectable()
export class ScriptsService {
  findAll(): string {
    return 'This action returns all scripts';
  }}
```

- Step 3 - Update the Module: Ensure that the module file (`scripts.module.ts`) imports and provides the controller and service
```typescript
import { Module } from '@nestjs/common';
import {ScriptsController} from './scripts.controller';
import {ScriptsService} from './scripts.service';
@Module({
  controllers: [ScriptsController],
  providers: [ScriptsService],})
export class ScriptsModule {}
```

## Basic structure of a Back-end Server
```
nestjs-backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── schemas/
│   │   │   │   ├── user.schema.ts
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── local.strategy.ts
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   ├── database.service.ts
├── test/
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
├── .env
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
```
Explanation:
- `src/`: Main source directory.
	- `app.module.ts`: Root module.
	- `main.ts`: Entry point of the application.
	- `common/`: Directory for common utilities like filters, guards, interceptors, and pipes.
	- `modules/`: Directory for feature-specific modules.
		- `users/`: Users feature module.
			- `users.module.ts`: Defines the users module.
			- `users.controller.ts`: Handles users-related requests.
			- `users.service.ts`: Contains business logic for users.
			- `schemas/`: Directory for Mongoose schemas (optional).
				- `user.schema.ts`: Mongoose schema for user entity.
		- `auth/`: Authentication module…
	- `config/`: Configuration files for the application.
	- `database/`: Database configuration module and service.
- `test/`: Directory for test-related files.

## (Database connection) [be-server/src/database]
We use MongoDB

## FTP-server connection
An FTP (File Transfer Protocol) server is a type of server that allows users to transfer files between their local computer and the server. It's commonly used for website maintenance, file sharing, and data storage

### Steps to set up an FTP server on Windows

- **Step 1: Install FTP Server Feature**
	- **Open Control Panel**: Go to the `Control Panel` and select `Programs and Features`.
	- **Turn Windows Features On or Off**: Click on `Turn Windows features on or off`.
	- **Enable FTP Server**: Expand `Internet Information Services`, then expand `FTP Server`, and check `FTP Service`. Click `OK` to install the necessary components.

- **Step 2: Configure FTP Server**
	- **Open IIS Manager**: Go to the `Control Panel`, open `Administrative Tools`, and select `Internet Information Services (IIS) Manager`.
	- **Add FTP Site**: Right-click on `Sites` and select `Add FTP Site`.
	- **Enter Details**: Enter a name for your FTP site and specify the physical path to the directory you want to share.
	- **Configure Bindings**: Set the IP address and port for the FTP site. By default, FTP uses port `21`. Choose `No SSL` for simplicity unless you require a secure connection.
	- **Set Authentication and Authorization**: Choose `Basic` for authentication and specify which users can access your FTP server. Set permissions to `Read` or `Read/Write` as needed.

- **Step 3: Configure Windows Firewall**
	- **Open Windows Firewall Settings**: Go to the `Control Panel`, open `System and Security`, and click on `Windows Defender Firewall`.
	- **Allow FTP**: Click on `Allow an app or feature through Windows Defender Firewall`.
	- **Enable FTP**: Check the boxes for FTP Server under both "Private" and "Public" network settings.

- **Step 4: Test FTP Server**
	- **Open FTP Client**: Use an FTP client (e.g., FileZilla) to connect to your FTP server.
	- **Enter Credentials**: Provide the FTP server address, username, and password.
	- **Access Files**: Verify that you can access and transfer files to and from the FTP server.

### Steps to connect to an FTP server using Nest.js

- **Step 1: Installation**: install the `nestjs-ftp module`
```bash
npm install nestjs-ftp
npm install @nestjs/config
```

- **Step 2: Configuration**: configure the FTP module in your `AppModule`:
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FtpModule } from 'nestjs-ftp';

@Module({
  imports: [
    ConfigModule,
    FtpModule.forRootFtpAsync({
      useFactory: async (config: ConfigService) => {
        return {
          host: config.get<string>('FTP_URL'),
          port: config.get<number>('FTP_PORT'),
          user: config.get<string>('FTP_USER'),
          password: config.get<string>('FTP_PASS'),
          secure: config.get<boolean>('FTP_SECURE'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

- **Step 3: Environment Configuration**: Make sure to set the FTP server details in your environment configuration file `.env`
```
FTP_URL=ftp.example.com
FTP_PORT=21
FTP_USER=username
FTP_PASS=password
FTP_SECURE=true
```

## Run the application
Start the NestJS application:
```bash
npm run start
```
The server will start, and you can access the endpoint at `http://localhost:3000/scripts`