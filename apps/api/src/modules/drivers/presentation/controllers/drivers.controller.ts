import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../../identity/presentation/decorators/current-user.decorator';
import { Roles } from '../../../identity/presentation/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../identity/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../identity/presentation/guards/roles.guard';
import { AuthenticatedUser } from '../../../identity/application/types/authenticated-user';
import { UserRole } from '../../../identity/domain/enums/user-role.enum';
import { ApiErrorResponseDto } from '@/common/filters/api-error-response.dto';
import { OnboardDriverUseCase } from '../../application/use-cases/onboard-driver.use-case';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { DriverProfileResponseDto } from '../dto/driver-profile-response.dto';
import { toDriverProfileResponse } from '../mappers/driver-profile-response.mapper';

@Controller('drivers')
@ApiTags('drivers')
export class DriversController {
  constructor(private readonly driverOnboarding: OnboardDriverUseCase) {}

  @Post('onboarding')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.DRIVER)
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({ type: DriverProfileResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ type: ApiErrorResponseDto })
  @ApiConflictResponse({ type: ApiErrorResponseDto })
  async onboardDriver(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateVehicleDto,
  ): Promise<DriverProfileResponseDto> {
    const profile = await this.driverOnboarding.execute({
      userId: user.id,
      type: dto.type,
      make: dto.make,
      model: dto.model,
      color: dto.color,
      year: dto.year ?? null,
      licensePlate: dto.licensePlate,
    });
    return toDriverProfileResponse(profile);
  }
}
