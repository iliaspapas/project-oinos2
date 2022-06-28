import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStragety } from './strageties/local.stragety';
import { JwtStrategy } from './strageties/jwt.stragety';
import { jwtConfig } from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService, LocalStragety, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
