import Order from '../entities/order';
import OrderItem from '../entities/orderitem';
import Wine from '../entities/wines';
import { createConnection } from 'typeorm';
import Users from '../entities/users';
import { Configuration } from '../config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    import: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      console.log('PRoCESS', configService.get('database.host'));
      await createConnection({
        type: 'postgres',
        host: configService.get('database.host'), // configuration.getDbHost(),
        port: configService.get('database.port'), // port: configuration.getDbPort(),
        username: configService.get('database.dbusername'), // username: configuration.getDbUsername(),
        password: configService.get('database.dbpassword'), // password: configuration.getDbPass(),
        database: configService.get('database.dbname'), // database: configuration.getDbName(),
        entities: [Users, Order, Wine, OrderItem],
        synchronize: true,
      });
    },
  },
];
