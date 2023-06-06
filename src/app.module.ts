import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RemixController } from './remix/remix.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../public'),
      serveStaticOptions: {
        immutable: true,
        maxAge: '1y',
      },
    }),
  ],
  controllers: [RemixController],
  providers: [AppService],
})
export class AppModule {}
