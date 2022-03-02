import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [
        __dirname + '/../../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
