import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '@/utils/error.mgmt';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjDTO, UserUpdateDTO } from './dto/user.dto';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      body.pass = await bcrypt.hash(body.pass, +process.env.HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USER_POST - Error creating user  ${error.message}`,
      );
    }
  }

  async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'There is no users registered',
        });
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USERS_GET - Error when looking for users on database  ${error.message}`,
      );
    }
  }

  async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();
      if (!user)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There is no users with ID ${id}`,
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USERS_GET - Error when looking for user with ID ${id}  ${error.message}`,
      );
    }
  }

  async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.pass')
        .where({ [key]: value })
        .getOne();
      if (!user)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `There is no users found with "${key}: ${value}"`,
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USERS_GET - Error looking for users with "${key}: ${value}"   ${error.message}`,
      );
    }
  }

  async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `${user.affected} updated`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USERS_PATCH - Error when updating user  ${error.message}`,
      );
    }
  }

  async assignUserToProject(body: UserToProjDTO) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `Cannot assign user to project  ${error.message}`,
      );
    }
  }

  async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `${user.affected} deleted`,
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `USERS_DELETE - Error when deleting user  ${error.message}`,
      );
    }
  }
}
