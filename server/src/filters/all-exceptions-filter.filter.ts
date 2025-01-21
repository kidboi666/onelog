import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException(exception);
    }

    const response = (exception as HttpException).getResponse();
    const stack = exception.stack;
    const log = {
      timestamp: new Date(),
      url: req.url,
      response,
      stack,
    };
    this.logger.log(log);

    console.log(log);

    res.status((exception as HttpException).getStatus()).json(response);
  }
}
