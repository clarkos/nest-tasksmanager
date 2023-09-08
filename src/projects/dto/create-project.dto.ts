import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  projName: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
