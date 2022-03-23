import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public, RequireRoles } from 'src/decorators';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private usersService: UsersService
        ) {}

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

    @Public()
    @Post('createUser')
    async createUser(@Request() req) {
        await this.usersService.createUser(req.body);
        return { result: true };
    }

    @RequireRoles('ADMIN')
    @Get('adminMethod')
    onlyAdminMethod() {
        return { result: true };
    }
}
