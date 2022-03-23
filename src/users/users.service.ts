import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/auth/dto/createuser.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: {
                'username': username
            },
            relations: ['roles']
        });
    }

    async createUser(data: CreateUserDTO) {
        var user = new User();

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(data.password, salt); 

        user = { 
            id: undefined,
            roles: [],
            firstName: data.firstName,
            lastName: data.lastName,
            password: passwordHash,
            username: data.username 
        };

        this.usersRepository.create(user);
        this.usersRepository.save(user);
    }
}
