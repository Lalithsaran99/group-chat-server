import { Controller, Request, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req)
        return await this.authService.login(req);
    }
}