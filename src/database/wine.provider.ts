import { Connection } from 'typeorm';
import { Wine } from '../entities/wines';

export const photoProviders = [
  {
    provide: 'WINE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Wine),
    inject: ['DATABASE_CONNECTION'],
  },
];
