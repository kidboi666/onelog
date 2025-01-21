import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('OneSentence', {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
      ],
    }),
  });
  await app.listen(process.env.PORT!, () => {
    console.log(`Server running at http://localhost:${process.env.PORT!} `);
  });
}

void bootstrap();
