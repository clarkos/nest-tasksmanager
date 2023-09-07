import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { user, pass }: AuthDTO) {
    const userValidate = await this.authService.validateUser(user, pass);

    if (!userValidate) throw new UnauthorizedException('Data not valid');

    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
