import { AuthTokenResult, IUseToken } from '@/interface/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;

    const currDate = new Date();
    const expiredDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiredDate <= +currDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
