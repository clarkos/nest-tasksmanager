import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { UserDTO, UserToProjDTO, UserUpdateDTO } from './dto/user.dto';
import { ErrorManager } from 'src/utils/error.mgmt';
import { UsersProjectsEntity } from './entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {
    // process.env.
  }

  async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      body.pass = await bcrypt.hash(body.pass, +process.env.HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'There is no results',
        });
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se encuentran resultados \n${error.message}`,
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
          type: 'BAD_REQUEST',
          message: 'There is no results',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se encuentran resultados por ID \n${error.message}`,
      );
    }
  }

  async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'There is no results to update',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se ha podido actualizar el usuario \n${error.message}`,
      );
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'There is no results to delete',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se puede borrar el usuario \n${error.message}`,
      );
    }
  }

  async assignUserToProject(body: UserToProjDTO) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se ha podido asignar el usuario al proyecto \n${error.message}`,
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
          type: 'BAD_REQUEST',
          message: 'There is no results',
        });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `No se ha podido encontrar por email o ID \n${error.message}`,
      );
    }
  }
}
