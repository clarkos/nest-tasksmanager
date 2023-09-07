import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/users/entities/users.entity';
import { PayloadToken } from 'src/interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(user: string, pass: string) {
    const selectType = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
    let field = {
      key: undefined,
      value: user,
    };
    if (user.match(selectType)) {
      field.key = 'email';
    } else {
      field.key = 'user';
    }
    const validatedUser = await this.userService.findBy(field);
    const match = await bcrypt.compare(pass, validatedUser.pass);
    if (match) return validatedUser;
    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UsersEntity): Promise<any> {
    const getUser = await this.userService.findUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
