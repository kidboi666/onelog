import { Module } from '@nestjs/common';
import { MessagesController } from '../controllers/messages.controller';
import { MessagesService } from '../services/messages.service';
import { Message } from '../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
