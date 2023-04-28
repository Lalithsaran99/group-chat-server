import { Module } from '@nestjs/common';
import { GroupService } from './groups.service';
import { GroupController } from './groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema, Groups } from './groups.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Groups.name, schema: GroupSchema }]),
  ],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupsModule { }
