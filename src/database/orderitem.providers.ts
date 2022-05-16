import { Connection } from 'typeorm';
import { OrderItem } from '../entities/orderitem';

export const photoProviders = [
  {
    provide: 'ORDERITEM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OrderItem),
    inject: ['DATABASE_CONNECTION'],
  },
];
