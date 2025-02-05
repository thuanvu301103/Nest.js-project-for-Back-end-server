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

## FTP-server connection foe files storage
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

### Handle file upload from FE-Server and store them in FTP-Server (takes place in BE-Server)

Create a module named `files`

#### Set up FTP Server connection
```typescript
// files.service.ts
import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { ConfigService } from '@nestjs/config';

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
}
```

#### Save FTP Credentials in `.env` file
```
FTP_HOST=192.168.2.16
FTP_USER=anonymous
FTP_PASSWORD=password
FTP_SECURE=false
FTP_UPLOAD_DIR=/uploads
```

#### Get file from Multer and sent file to FTP Server then delete temporary saved file in BE-Server

```typescript
// files.service.ts
async uploadFilesToFTP(files: Express.Multer.File[]) {
        try {
            await this.connectToFTP();

            // Ensure remote directory exists
            await this.ftpClient.ensureDir(this.ftpUploadDir);

            for (const file of files) {
                const localPath = path.join(__dirname, "../../uploads", file.filename);
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
```

## Run the application
Start the NestJS application:
```bash
npm run start
```
The server will start, and you can access the endpoint at `http://localhost:3000/scripts`