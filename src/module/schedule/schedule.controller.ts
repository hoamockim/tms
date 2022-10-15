import { Controller, Scope } from '@nestjs/common';
import { Route } from '../../route';

@Controller({
  path: Route.URLV1 + 'schedule/',
  scope: Scope.REQUEST,
})
export class ScheduleController {}
