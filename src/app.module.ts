import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmCongif } from './config/typeorm.config';
import { TasksModule } from './entities/tasks/tasks.module';
import { AuthModule } from './entities/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmCongif), TasksModule, AuthModule],
})
export class AppModule {}
