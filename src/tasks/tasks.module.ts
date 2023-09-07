import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { ProjectsEntity } from '@/projects/entities/project.entity';
import { ProjectsService } from '@/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, ProjectsEntity])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
})
export class TasksModule {}
