import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RemixController } from './remix/remix.controller';

@Module({
  imports: [],
  controllers: [RemixController],
  providers: [AppService],
})
export class AppModule {}
