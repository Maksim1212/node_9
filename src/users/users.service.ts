import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from './users.interface';


@Injectable()
export class UsersService {
    books: IUser[] = [];

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>){}

    async insertUser(@Body() body: IUser): Promise<any> {
        return this.userModel.create(body);
    }

    getUsers() {
        return this.userModel.find({},{ '__v': 0 } ).exec();
      }
    
      async getSingleUser(userId: string) {
        return await this.findUser(userId);
      }
    
     async updateUser(userId: string, updatedBook: IUser) {
       return await this.userModel.updateOne({userId}, updatedBook).exec();
      }
    
      async deleteUser(userId: string) {
        return await this.userModel.deleteOne({_id: userId}).exec();  
      }
    
      private async findUser(id: string): Promise<IUser>{
          let user;
          try{
            user = await this.userModel.findById(id).exec()
          }catch(error){
            throw new NotFoundException('Could not find user');
          }
        if (!user) {
           throw new NotFoundException('Could not find user');
        }
        return user;
      }
}