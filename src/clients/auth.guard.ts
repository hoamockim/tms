import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('ACCOUNT_SERVICE')
    private readonly accountServiceClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userTokenInfo = await firstValueFrom(
      this.accountServiceClient.send('token_decode', {
        token: request.headers.authorization,
      }),
    );

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await firstValueFrom(
      this.accountServiceClient.send(
        'user_get_by_id',
        userTokenInfo.data.userId,
      ),
    );

    request.user = userInfo.user;
    return true;
  }
}
