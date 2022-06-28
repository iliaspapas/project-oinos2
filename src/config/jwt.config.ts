import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { Configuration } from './config.service';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configuration: ConfigService) => {
    console.log(configuration.get('APP_SECRET'));
    return {
      secret: configuration.get('APP_SECRET'),
      signOptions: { expiresIn: '60s' },
    };
  },
};
