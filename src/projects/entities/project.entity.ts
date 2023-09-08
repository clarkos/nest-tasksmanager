import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../../interface/project.interface';
import { BaseEntity } from '../../config/base.entity';
import { TasksEntity } from '../../tasks/entities/task.entity';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
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
