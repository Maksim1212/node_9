import { 
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpStatus,
    HttpException,
 } from '@nestjs/common';

import { UsersService } from './users.service';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers();
  }
}
@Controller('api/users')
export class UsersApiController {
    constructor(private usersService: UsersService) {}
  @Post()
  async addUser(@Body() body: IUser): Promise<IUser>{
    try {
       return await this.usersService.insertUser(body);
    } catch (error){
      throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string,@Body() body: IUser) {
    return await this.usersService.updateUser(userId, body);
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
     return await this.usersService.deleteUser(userId);
  }
}