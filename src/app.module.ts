import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './modules/api/api.module';
import { RemixModule } from './modules/remix/remix.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { configSchema } from './utils/config.schema';
import { HealthModule } from './modules/health/health.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
      }),
    }),
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
