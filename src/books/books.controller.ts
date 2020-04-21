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

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
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

  @Get()
  async getAllBooks() {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') bookId: string) {
    return this.booksService.getSingleBook(bookId);
  }

  @Patch(':id')
  async updateBook(@Param('id') bookId: string,@Body() body: IBook) {
    return await this.booksService.updateBook(bookId, body);
  }

  @Delete(':id')
  async removeBook(@Param('id') bookId: string) {
     return await this.booksService.deleteBook(bookId);
  }
}