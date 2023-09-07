import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from '@/projects/projects.service';
import { ErrorManager } from '@/utils/error.mgmt';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  async createTask(body: TaskDto, projectId: string): Promise<TasksEntity> {
    try {
      const project = await this.projectService.findProjectById(projectId);
      if (!project) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Not found the project ID "${projectId}" to assign the task`,
        });
      }
      return await this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(
        `TASKS_POST - Error creating task \n${error.message}`,
      );
    }
  }

  /* async findAll() {
    return `This action returns all tasks`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: TaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string) {
    return `This action removes a #${id} task`;
  } */
}
