import { Controller, Get, Post, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { Request } from 'express'

@Controller('/books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(): any {
        return this.booksService.findAll();
    }

    // @Get('/:id')
    // findOne(@Req() req: Request): any {
    //     return this.booksService.findOne(req);
    // }

    @Get('/:title')
    findBooksByTitle(@Req() req: Request): any {
        return this.booksService.findBooksByTitle(req);
    }

    @Post()
    postBook(@Req() req: Request): any {
        return this.booksService.postBook(req);
    }
}
