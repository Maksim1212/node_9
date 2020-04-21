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

import { BooksService } from './books.service';
import { IBook } from './books.interface';

@Controller()
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post('api/books')
    async addBook(@Body() body: IBook): Promise<IBook>{
      try {
         return await this.booksService.insertBook(body);
      } catch (error){
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  @Get('books')
  async getAllBooks() {
    return await this.booksService.getBooks();
  }

  @Get('api/books:id')
  getBook(@Param('id') bookId: string) {
    return this.booksService.getSingleBook(bookId);
  }

  @Patch('api/books:id')
  async updateBook(@Param('id') bookId: string,@Body() body: IBook) {
    return await this.booksService.updateBook(bookId, body);
  }

  @Delete('api/books:id')
  async removeBook(@Param('id') bookId: string) {
     return await this.booksService.deleteBook(bookId);
  }
}