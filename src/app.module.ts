import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './entities/tasks/tasks.module';
import { AuthModule } from './entities/auth/auth.module';
import * as config from 'config';

const ormConfig = config.get('ormConfig');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
