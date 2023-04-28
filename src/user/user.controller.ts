import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { UserDto } from "./interface";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/getUsers')
  async users(): Promise<User[]> {
    return await this.userService.getUsers()
  }

  @Post('/createUsers')
  async createUsers(@Body() data: UserDto): Promise<User> {
    return await this.userService.createUser(data)
  }

}