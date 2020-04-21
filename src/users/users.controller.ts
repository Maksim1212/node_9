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

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('api/users')
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

  @Get('users')
  async getAllUsers() {
    return await this.usersService.getUsers();
  }

  @Get('api/users:id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch('api/users:id')
  async updateUser(@Param('id') userId: string,@Body() body: IUser) {
    return await this.usersService.updateUser(userId, body);
  }

  @Delete('api/users:id')
  async removeUser(@Param('id') userId: string) {
     return await this.usersService.deleteUser(userId);
  }
}