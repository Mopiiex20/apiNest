import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/auth')
    Authentification(@Req() req: Request, @Res() res: Response): any {
        return this.authService.Authentification(req, res);
    }

}
