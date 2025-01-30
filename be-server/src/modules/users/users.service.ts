// src/modules/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(name: string, email: string): Promise<User> {
        const newUser = new this.userModel({ name, email });
        return newUser.save();
    }

    async findAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}