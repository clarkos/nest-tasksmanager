import { Column, Entity, ManyToOne } from 'typeorm';
import { ACCESS_LEVEL } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from '../../projects/entities/project.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectIncludes)
  user: UsersEntity;

  @ManyToOne(() => ProjectsEntity, (project) => project.usersIncludes)
  project: ProjectsEntity;
}
