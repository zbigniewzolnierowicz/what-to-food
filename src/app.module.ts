import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './modules/api/api.module';
import { RemixModule } from './modules/remix/remix.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { configSchema } from './utils/config.schema';
import { HealthModule } from './modules/health/health.module';
import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import MikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/../../public'),
      serveStaticOptions: {
        immutable: true,
        maxAge: '1y',
      },
    }),
    ApiModule,
    HealthModule,
    RemixModule,
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        return configSchema.parse(config);
      },
    }),
    MikroOrmModule.forRoot(MikroOrmConfig as MikroOrmModuleSyncOptions),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
