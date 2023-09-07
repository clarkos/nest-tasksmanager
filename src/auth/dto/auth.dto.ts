import { AuthBody } from '@/interface/auth.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO implements AuthBody {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  @IsString()
  pass: string;
}
