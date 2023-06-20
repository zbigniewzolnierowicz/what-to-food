import { Module } from '@nestjs/common';
import { RemixController } from './controllers/remix.controller';

@Module({
  controllers: [RemixController],
})
export class RemixModule {}
