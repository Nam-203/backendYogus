import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.Schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './../../auth/dto/create-auth.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private useModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  async findbyEmail(email: string) {
    return await this.useModel.findOne({ email: email });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private async isEmailExists(email: string) {
    const isExit = await this.useModel.exists({ email });
    return isExit;
  }
  private async hasspassword(password: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  async register(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;
    if (await this.isEmailExists(email)) {
      throw new BadRequestException(`invalid email ${email}`);
    }
    if (!email) {
      throw new BadRequestException(' email is required');
      
    }
    const hashedPassword = await this.hasspassword(password);
    const user = await this.useModel.create({
      name,
      email,
      password: hashedPassword,
      isActive: false,
    });
    return user;
  }
}
