import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjectsEntity } from '@/users/entities/usersProjects.entity';
import { UsersService } from '@/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])],
  providers: [ProjectsService, UsersService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
