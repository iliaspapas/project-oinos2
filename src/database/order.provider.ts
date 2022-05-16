import { Connection } from 'typeorm';
import { Order } from '../entities/order';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
];
