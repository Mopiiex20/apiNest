import { Controller, Get, Post, Req, Res, Put, Delete ,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import * as Request1 from "@nestjs/common"

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService,private readonly authService: AuthService) { }

    @Get()
    findAll(@Res() res: Response): any {
        return this.usersService.findAll(res);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/currentUser')
    getProfile(@Request1.Request() req) {
      return req.user;
    }
    // @Get('/:id')
    // findOne(@Req() req: Request, @Res() res: Response): any {
    //     return this.usersService.findOne(req, res);
    // }

    @Delete('/:id')
    delete(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.delete(req, res);
    }


    @Put('/:id')
    update(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.update(req, res);
    }

    @Post("/signup")
    registerNewUser(@Req() req: Request, @Res() res: Response): any {
        return this.usersService.registerNewUser(req, res);
    }

}
