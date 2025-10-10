import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User } from '@task-app/data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(username);
    const ok = user && (await bcrypt.compare(password, user.password));

    if (!ok) {
      throw new UnauthorizedException("Email or password don't match");
    }
    return this.signUser(user);
  }

  async register(userDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.create(userDto);
    return this.signUser(user);
  }

  private async signUser(user: User) {
    const payload = {
      sub: user.id,
      username: user.email,
      role: user.role,
      organization: user.organization,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
