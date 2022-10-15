import { Controller, Get, Header, Scope } from '@nestjs/common';
import { Route } from '../../route';
import { ResponseDto } from '../dto';

@Controller({
  path: Route.URLV1 + 'sys/',
  scope: Scope.DEFAULT,
})
export class AppController {
  @Get('health-check')
  @Header('Content-Type', 'application/json')
  get(): ResponseDto {
    return ResponseDto.ok({});
  }
}
