import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Public } from './auth/decorator/public.decor';
import { RolesGuard } from './auth/guard/roles.guard';
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('login');
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
