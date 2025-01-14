import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { DatabaseModule } from '../../config/database.module';
import { messagesProvider } from './messages.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MessagesController],
  providers: [...messagesProvider, MessagesService],
})
export class MessagesModule {}
