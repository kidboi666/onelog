import { Module } from '@nestjs/common';
import { UsedWordsController } from '../controllers/used-words.controller';
import { UsedWordsService } from '../services/used-words.service';
import { UsedWord } from '../entities/used-word.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsedWord])],
  controllers: [UsedWordsController],
  providers: [UsedWordsService],
})
export class UsedWordsModule {}
