import { HttpException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model, Types } from "mongoose";
import { UserDto } from "./interface";
import { User } from "./user.model";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }


    async createUser(data: UserDto): Promise<User> {
        try {
            return await this.userModel.create({
                email: data?.email,
                name: data?.name,
                type: data?.type,
                password: data?.password ? bcrypt.hashSync(data?.password, 10) : null
            })
        } catch (error) {
            if (error?.code === 'E11000') {
                Logger.error("Email already exists")
                throw new HttpException({ reason: 'Email already exists' }, 500)
            }
        }
    }


    async findById(id: string): Promise<User> {
        return await this.userModel.findById({ _id: new Types.ObjectId(id) })
    }


    async getUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email })
    }


    async getUsers(): Promise<User[]> {
        return await this.userModel.find()
    }


}