import {
  createParamDecorator,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

interface ClassConstructor {
  new (...args: any[]): object;
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {},
);
