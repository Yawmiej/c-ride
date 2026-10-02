import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { toRegisterUserCommand } from '../../application/commands/register-user.command';
import { RegistrationConflictError } from '../../application/errors/registration-conflict.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.registerUser.execute(toRegisterUserCommand(dto));
    } catch (error) {
      if (error instanceof RegistrationConflictError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
