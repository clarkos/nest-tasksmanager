import { ROLES } from '../constants/roles';

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  user: string;
  pass: string;
  role: ROLES;
}
