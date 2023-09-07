import { STATUS_TASK } from '@/constants/statusTask';
import { CreateProjectDto } from '@/projects/dto/create-project.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  taskDescription: string;

  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;

  @IsNotEmpty()
  @IsString()
  responsableName: string;

  @IsOptional()
  project?: CreateProjectDto;
}
