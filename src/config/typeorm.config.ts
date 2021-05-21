import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    database:'todo',
    entities:[__dirname + '/../**/*.entity.ts'],
    synchronize:true,
};