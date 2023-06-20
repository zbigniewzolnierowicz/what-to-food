import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './modules/api/api.module';
import { RemixModule } from './modules/remix/remix.module';

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
    RemixModule,
  ],
  providers: [],
})
export class AppModule {}
