import {
  Body,
  Get,
  UseGuards,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../dto/login.dto';
import { toRegisterUserCommand } from '../../application/commands/register-user.command';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterDto } from '../dto/register.dto';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthenticatedUser } from '../../application/types/authenticated-user';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '@/common/filters/api-error-response.dto';
import { AuthResponseDto, UserResponseDto } from '../dto/auth-response.dto';

@Controller('auth')
@ApiTags('identity')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUseCase,
    private readonly getCurrentUser: GetCurrentUserUseCase,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  async me(@CurrentUser() user: AuthenticatedUser) {
    return this.getCurrentUser.execute(user.id);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  async login(@Body() dto: LoginDto) {
    return this.loginUser.execute({
      email: dto.email,
      password: dto.password,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiConflictResponse({ type: ApiErrorResponseDto })
  async register(@Body() dto: RegisterDto) {
    return this.registerUser.execute(toRegisterUserCommand(dto));
  }
}
