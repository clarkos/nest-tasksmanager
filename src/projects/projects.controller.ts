import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('new')
  async createProject(
    @Body() body: CreateProjectDto,
    @Param('userId') userId: string,
  ) {
    return await this.projectsService.createProject(body, userId);
  }

  @Get()
  async findProjects() {
    return await this.projectsService.findProjects();
  }

  @Get(':id')
  async findProjectById(@Param('projectId') id: string) {
    return await this.projectsService.findProjectById(id);
  }

  @Patch(':id/edit')
  async updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.updateProject(body, id);
  }

  @Delete(':id/delete')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
