import { Controller, Get, Request, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';




@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
