import { ROLES } from '@/constants/roles';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthBody {
  user: string;
  pass: string;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  ait: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
