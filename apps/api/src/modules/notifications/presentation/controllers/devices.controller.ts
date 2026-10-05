import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '@/modules/identity/application/types/authenticated-user';
import { CurrentUser } from '@/modules/identity/presentation/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/modules/identity/presentation/guards/jwt-auth.guard';
import { RegisterDeviceUseCase } from '../../application/use-cases/register-device.use-case';
import { DeviceResponseDto } from '../dto/device-response.dto';
import { RegisterDeviceDto } from '../dto/register-device.dto';

@Controller('devices')
@ApiTags('devices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class DevicesController {
  constructor(private readonly registerDevice: RegisterDeviceUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: DeviceResponseDto })
  async register(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RegisterDeviceDto,
  ): Promise<DeviceResponseDto> {
    return (
      await this.registerDevice.execute({ userId: user.id, ...dto })
    ).toSafeObject();
  }
}
