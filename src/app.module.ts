import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.connection/db-module';

import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { booksProviders } from './books/books.providers';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { usersProviders } from './users/users.providers';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { authProviders } from './auth/auth.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController, UsersController, AuthController],
  providers: [
    BooksService,
    ...booksProviders,
    UsersService,
    ...usersProviders,
    AuthService,
    ...authProviders
  ]
}
)
export class AppModule { }
