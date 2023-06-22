import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { NewUserDTO } from '../dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login() {
    return 'login';
  }

  @Get('/')
  async me() {
    return 'me';
  }

  @Post('/new')
  @UsePipes(new ValidationPipe())
  async signup(@Body() newUserDTO: NewUserDTO) {
    return this.authService.createUser(newUserDTO);
  }
}
