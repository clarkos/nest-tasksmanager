import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersProjectsEntity } from '@/users/entities/usersProjects.entity';
import { UsersService } from '@/users/users.service';
import { ErrorManager } from '@/utils/error.mgmt';
import { ACCESS_LEVEL } from '@/constants/roles';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createProject(body: CreateProjectDto, userId: string): Promise<any> {
    try {
      const user = await this.usersService.findUserById(userId);
      const project = await this.projectRepository.save(body);
      return await this.userProjectRepository.save({
        accessLevel: ACCESS_LEVEL.OWNER,
        user,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `PROJECT_POST - Error creating project  ${error.message}`,
      );
    }
  }

  async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects: ProjectsEntity[] = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'There is No projects',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `PROJECT_GET - Error when looking for projects  ${error.message}`,
      );
    }
  }

  async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.projectIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `There no project with ID ${id}`,
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `PROJECT_GET - Error when looking for project id ${id}  ${error.message}`,
      );
    }
  }

  async updateProject(
    body: UpdateProjectDto,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Project ${id} cannot be updated`,
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `PROJECT_PUT - Error when updating project ${id}  ${error.message}`,
      );
    }
  }

  async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Cannot Delete Project ${id}`,
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `PROJECT_DELETE - Error when deleting project ${id}  ${error.message}`,
      );
    }
  }
}
