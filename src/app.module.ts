import { Module } from '@nestjs/common';
import { RemixController } from './remix/remix.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../public'),
      serveStaticOptions: {
        immutable: true,
        maxAge: '1y',
      },
    }),
    ApiModule,
  ],
  controllers: [RemixController],
  providers: [],
})
export class AppModule {}
