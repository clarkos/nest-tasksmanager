import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IUser } from '../../interface/user.interface';
import { ROLES } from '../../constants/roles';
import { BaseEntity } from '../../config/base.entity';
import { UsersProjectsEntity } from './usersProjects.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  user: string;

  @Exclude()
  @Column()
  pass: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => UsersProjectsEntity, (userProjects) => userProjects.user)
  projectsIncludes: UsersProjectsEntity[];
}
