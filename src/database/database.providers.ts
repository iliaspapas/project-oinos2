import Order from '../entities/order';
import OrderItem from '../entities/orderitem';
import Wine from '../entities/wines';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'oinos',
        entities: [Order, Wine, OrderItem],
        synchronize: true,
      }),
  },
];
