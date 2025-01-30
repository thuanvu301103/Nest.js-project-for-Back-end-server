import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() body: { name: string; email: string }): Promise<User> {
        return this.usersService.createUser(body.name, body.email);
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }
}
