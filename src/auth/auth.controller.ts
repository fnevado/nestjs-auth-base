import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public } from 'src/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
