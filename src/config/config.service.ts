import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {}

  getAppSecret = () => {
    return this.configService.get<string>('appSecret');
  };

  getDbHost = () => {
    return this.configService.get<string>('database.host');
  };

  getDbPort = () => {
    return this.configService.get<number>('database.port');
  };
  getDbName = () => {
    return this.configService.get<string>('database.dbname');
  };
  getDbUsername = () => {
    return this.configService.get<string>('database.dbusername');
  };
  getDbPass = () => {
    return this.configService.get<string>('database.dbpassword');
  };
}
