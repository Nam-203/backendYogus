import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decoded/custumsize';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async handleLogin(@Request() req) {
      return this.authService.login(req.user);
    }
    
    @Public()
    @Post('register')
    async register(@Body() registerDto:CreateAuthDto) {
      return this.authService.register(registerDto);
    }
}

