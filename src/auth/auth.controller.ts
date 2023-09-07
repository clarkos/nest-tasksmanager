import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../interface/auth.interface';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { user, pass }: AuthBody) {
    const userValidate = await this.authService.validateUser(user, pass);

    if (!userValidate) throw new UnauthorizedException('Data not valid');

    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
