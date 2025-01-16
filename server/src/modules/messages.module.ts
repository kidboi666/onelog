import { Module } from '@nestjs/common';
import { MessagesController } from '../controllers/messages.controller';
import { MessagesService } from '../services/messages.service';
import { DatabaseModule } from '../config/database.module';
import { messagesProvider } from '../providers/messages.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [...messagesProvider, MessagesService],
})
export class MessagesModule {}
