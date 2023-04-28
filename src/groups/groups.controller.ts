import { Body, Controller, Get, Post } from "@nestjs/common";


import { GroupDto } from "./interface";
import { Groups } from "./groups.model";
import { GroupService } from "./groups.service";

@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Get('/getGroups')
    async groups(): Promise<Groups[]> {
        return await this.groupService.getGroups()
    }

    @Post('/createGroups')
    async createGroups(@Body() data: GroupDto): Promise<Groups> {
        return await this.groupService.createGroup(data)
    }

    @Post('/updateGroup')
    async updateGroup(@Body('id') id: string, @Body('data') data: GroupDto): Promise<Groups> {
        return await this.groupService.updateGroup(id, data)
    }

}