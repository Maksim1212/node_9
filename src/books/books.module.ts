import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BooksController, BooksApiController } from './books.controller'
import { BooksService } from './books.service';
import { BookSchema } from './book.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Book', schema: BookSchema}])],
    controllers: [BooksController,BooksApiController],
    providers: [BooksService],
})
export class BooksModule {}