import { BaseEntity } from '@/config/base.entity';
import { IProject } from '@/interface/project.interface';
import { UsersProjectsEntity } from '@/users/entities/usersProjects.entity';
import { Column, OneToMany } from 'typeorm';
import { TasksEntity } from '@/tasks/entities/task.entity';

export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  projName: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (userProjects) => userProjects.project)
  usersIncludes: UsersProjectsEntity[];

  @OneToMany(() => TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}
