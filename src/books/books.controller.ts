import { 
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
 } from '@nestjs/common';

import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Post()
    async addBook(
        @Body('title') bookTitle: string,
        @Body('description') bookDescription: string,
        @Body('price') bookPrice: number,
        ) {
         const generatedID = await this.booksService.insertBook(
             bookTitle,
             bookDescription,
             bookPrice
        );
         return {id: generatedID};
        };

  @Get()
  async getAllBooks() {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':id')
  getBook(@Param('id') bookId: string) {
    return this.booksService.getSingleBook(bookId);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body('title') bookTitle: string,
    @Body('description') bookDesc: string,
    @Body('price') bookPrice: number,
    ) {
    await this.booksService.updateBook(bookId, bookTitle, bookDesc, bookPrice);
    return null;
  }

  @Delete(':id')
  async removeBook(@Param('id') bookId: string) {
      await this.booksService.deleteBook(bookId);
      return null;
  }

}