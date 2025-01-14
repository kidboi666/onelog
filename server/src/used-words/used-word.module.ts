import { Module } from '@nestjs/common';
import { UsedWord } from './used-word.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedWordController } from './used-word.controller';
import { UsedWordService } from './used-word.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsedWord])],
  controllers: [UsedWordController],
  providers: [UsedWordService],
  exports: [UsedWordService],
})
export class UsedWordModule {}
