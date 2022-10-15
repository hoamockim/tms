import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Authentication implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  use(_req: any, _res: any, _next: () => void) {
    throw new Error('Method not implemented.');
  }
}
