import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../auth/decorator/public.decor';
import { Role } from '../entities/roles';
import { Roles } from '../auth/decorator/roles.decorator';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  addUser(@Body() body: any): any {
    return this.userService.insertUser(body);
  }

  @Roles(Role.Admin)
  @Put(':id')
  updateUser(@Param('id') userId: string, @Body() body: any): any {
    return this.userService.updateUser(userId, body);
  }
  @Roles(Role.Admin)
  @Delete(':id')
  deleteUser(@Param('id') id: string): any {
    return this.userService.deleteUser(id);
  }
  @Roles(Role.Admin)
  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }
  @Roles(Role.Admin)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
