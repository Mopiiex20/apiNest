import { Injectable, Inject } from '@nestjs/common';
import { books } from './books.entity';
import { Response } from 'express';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof books) { }

  async findAll(): Promise<books[]> {
    return await this.BOOKS_REPOSITORY.findAll<books>();
    // return []

  }
  async findOne(req): Promise<books> {
    const id = req.params.id
    return await this.BOOKS_REPOSITORY.findOne<books>(id);

  }

  async postBook(req): Promise<any> {
    
    if (req.body.title) {
      console.log(req.body);
      const res = "Post is done!"
      const book = req.body;
      await this.BOOKS_REPOSITORY.create<books>(book)

      return res

    } else return "Requset body  is incorrect!"

  }

}