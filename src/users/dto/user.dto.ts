import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ACCESS_LEVEL, ROLES } from '@/constants/roles';
import { UsersEntity } from '../entities/users.entity';
import { ProjectsEntity } from '@/projects/entities/projects.entity';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  pass: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  pass: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserToProjDTO {
  @IsNotEmpty()
  @IsUUID()
  user: UsersEntity;

  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity;

  @IsNotEmpty()
  accessLevel: ACCESS_LEVEL;
}
