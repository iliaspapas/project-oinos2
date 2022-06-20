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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('register')
  addUser(@Body() body: any): any {
    return this.userService.insertUser(body);
  }
  // @Public()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  updateItem(@Param('id') usernameId: string, @Body() body: any): any {
    return this.userService.updateUser(usernameId, body);
  }
}
