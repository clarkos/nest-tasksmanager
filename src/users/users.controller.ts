import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserToProjDTO, UserUpdateDTO } from './dto/user.dto';
import { UsersEntity } from './entities/users.entity';
import { ProjectsEntity } from '@/projects/entities/project.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  @Post('add-to-project/:projectId')
  async assignUserToProject(
    @Body() body: UserToProjDTO,
    @Param('projectId') id: string,
  ) {
    return await this.userService.assignUserToProject({
      ...body,
      project: id as unknown as ProjectsEntity,
    });
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Patch(':id/edit')
  async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
    return await this.userService.updateUser(body, id);
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
