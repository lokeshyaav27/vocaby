import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const { password_hash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, email: string, password: string): Promise<User> {
        // Check if user already exists
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        return this.usersService.create({
            username,
            email,
            password_hash: hashedPassword,
        });
    }
}