import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiBody({ type: LoginDto })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 200, description: 'User successfully registered' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.authService.register(
            registerDto.username,
            registerDto.email,
            registerDto.password,
        );

        // Return user without password hash
        const { password_hash, ...result } = user;
        return result;
    }
}