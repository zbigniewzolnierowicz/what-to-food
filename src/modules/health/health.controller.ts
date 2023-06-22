import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, MikroOrmHealthIndicator } from '@nestjs/terminus';

@Controller('/readyz')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mikroOrm: MikroOrmHealthIndicator,
  ) {}

  @Get()
  check() {
    return this.health.check([() => this.mikroOrm.pingCheck('database')]);
  }
}
