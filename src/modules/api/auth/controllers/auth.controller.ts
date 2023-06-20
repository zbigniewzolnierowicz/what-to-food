import { Controller, Get, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  @Post('/login')
  async login() {
    return 'login';
  }

  @Get('/')
  async me() {
    return 'me';
  }

  @Post('/new')
  async signup() {
    return 'signup';
  }
}
