import { Injectable } from '@nestjs/common';
import { Groups } from './groups.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GroupDto } from './interface';

@Injectable()
export class GroupService {
    constructor(@InjectModel(Groups.name) private groupModel: Model<Groups>) { }

    async createGroup(data: GroupDto): Promise<Groups> {
        return await this.groupModel.create({
            name: data?.name,
            userIds: data?.userIds
        })
    }


    async getGroups(): Promise<Groups[]> {
        return await this.groupModel.find()
    }

    async updateGroup(_id: string, data: GroupDto): Promise<Groups> {
        await this.groupModel.updateOne({
            _id: new Types.ObjectId(_id)
        }, {
            name: data?.name,
            userIds: data?.userIds
        })

        return await this.groupModel.findById({
            _id: new Types.ObjectId(_id)
        })
    }
}
