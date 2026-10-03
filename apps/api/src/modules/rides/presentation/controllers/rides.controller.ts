import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '@/common/filters/api-error-response.dto';
import { AuthenticatedUser } from '../../../identity/application/types/authenticated-user';
import { UserRole } from '../../../identity/domain/enums/user-role.enum';
import { CurrentUser } from '../../../identity/presentation/decorators/current-user.decorator';
import { Roles } from '../../../identity/presentation/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../identity/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../identity/presentation/guards/roles.guard';
import { CreateRideUseCase } from '../../application/use-cases/create-ride.use-case';
import { GetRideUseCase } from '../../application/use-cases/get-ride.use-case';
import { CreateRideDto } from '../dto/create-ride.dto';
import { RideIdParamDto } from '../dto/ride-id-param.dto';
import { RideResponseDto } from '../dto/ride-response.dto';
import { toRideResponse } from '../mappers/ride-response.mapper';

@Controller('rides')
@ApiTags('rides')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class RidesController {
  constructor(
    private readonly createRide: CreateRideUseCase,
    private readonly getRide: GetRideUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.RIDER)
  @ApiCreatedResponse({ type: RideResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateRideDto,
  ): Promise<RideResponseDto> {
    return toRideResponse(
      await this.createRide.execute({ riderId: user.id, ...dto }),
    );
  }

  @Get(':id')
  @Roles(UserRole.RIDER, UserRole.DRIVER)
  @ApiOkResponse({ type: RideResponseDto })
  @ApiNotFoundResponse({ type: ApiErrorResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  async getById(
    @CurrentUser() user: AuthenticatedUser,
    @Param() params: RideIdParamDto,
  ): Promise<RideResponseDto> {
    return toRideResponse(
      await this.getRide.execute({ rideId: params.id, actorId: user.id }),
    );
  }
}
