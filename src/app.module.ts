import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: [
        PassportModule.register({
            defaultStrategy:'jwt'
        }),
        JwtModule.register({
            secret: '123456789',
            signOptions: {
                expiresIn: 3600,
            }
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        TasksModule,
        AuthModule],
})

export class AppModule { }