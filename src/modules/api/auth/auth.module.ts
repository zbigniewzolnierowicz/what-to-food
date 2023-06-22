import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './models/user.schema';

@Module({
  controllers: [AuthController],
  imports: [MikroOrmModule.forFeature([User])],
  providers: [AuthService],
})
export class AuthModule {}
