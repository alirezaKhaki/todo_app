import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    url:'postgres://postgres:postgres@postgres:5432/tasks',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tasks',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
};