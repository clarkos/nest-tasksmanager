import { ROLES } from '@/constants/roles';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthBody {
  user: string;
  pass: string;
}
