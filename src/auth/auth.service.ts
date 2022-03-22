import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dto/createuser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch){
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
