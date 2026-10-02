import {
  Body,
  Get,
  UseGuards,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationError } from '../../application/errors/authentication.error';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../dto/login.dto';
import { toRegisterUserCommand } from '../../application/commands/register-user.command';
import { RegistrationConflictError } from '../../application/errors/registration-conflict.error';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterDto } from '../dto/register.dto';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthenticatedUser } from '../../application/types/authenticated-user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUseCase,
    private readonly getCurrentUser: GetCurrentUserUseCase,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: AuthenticatedUser) {
    try {
      return await this.getCurrentUser.execute(user.id);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new UnauthorizedException('Invalid authentication');
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    try {
      return await this.loginUser.execute({
        email: dto.email,
        password: dto.password,
      });
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.CREATED)
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
