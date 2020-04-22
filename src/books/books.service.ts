import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBook } from './books.interface';


@Injectable()
export class BooksService {
    books: IBook[] = [];

    constructor(@InjectModel('Book') private readonly bookModel: Model<IBook>){}

    async insertBook(@Body() body: IBook): Promise<any> {
        return this.bookModel.create(body);
    }

    getBooks() {
        return this.bookModel.find({},{ '__v': 0 } ).exec();
      }
    
      async getSingleBook(bookId: string) {
        return await this.findBook(bookId);
      }
    
     async updateBook(bookId: string, updatedBook: IBook) {
       return await this.bookModel.updateOne({bookId}, updatedBook).exec();
      }
    
      async deleteBook(bookId: string) {
        return await this.bookModel.deleteOne({_id: bookId}).exec();  
      }
    
      private async findBook(id: string): Promise<IBook>{
          let book;
          try{
              book = await this.bookModel.findById(id).exec()
          }catch(error){
            throw new NotFoundException('Could not find book');
          }
        if (!book) {
           throw new NotFoundException('Could not find book');
        }
        return book;
      }
}