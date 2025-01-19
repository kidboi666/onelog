import { Module } from '@nestjs/common';
import { TodoFoldersController } from '../controllers/todo-folders.controller';
import { TodoFoldersService } from '../services/todo-folders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoFolder } from '../entities/todo-folder.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoFolder]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [TodoFoldersController],
  providers: [TodoFoldersService],
})
export class TodoFoldersModule {}
