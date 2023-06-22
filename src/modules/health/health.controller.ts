import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';

@Controller('/healthz')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {}

  @Get()
  check() {
    return this.health.check([() => this.mongooseHealth.pingCheck('mongodb')]);
  }
}
