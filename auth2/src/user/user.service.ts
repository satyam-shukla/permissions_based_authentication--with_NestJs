import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos/create-user-dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModal:Model<UserDocument>){}

    async addUser(createUserDTO:CreateUserDTO):Promise<User>{
        const newUser = await this.userModal.create(createUserDTO);
        newUser.password = await bcrypt.hash(newUser.password,10);
        return newUser.save()
    }

    async findUser(username:string):Promise<User | undefined>{
        const user = await this.userModal.findOne({username:username})
        return user;
    }   
}



