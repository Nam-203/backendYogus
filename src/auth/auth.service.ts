import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt  from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findbyEmail(username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(pass, user.password);
    if (!user || !isPasswordValid) {
      return null;
    }
    return user;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    const token = await this.generateAccessToken(payload);
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }
  private async generateAccessToken(payload) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: '365d',
      algorithm: 'HS256',
    });
    return {
      access_token,
      refresh_token,
    };
  }
  async register(resgiterDto: CreateAuthDto) {
    return this.usersService.register(resgiterDto);
  }
}
