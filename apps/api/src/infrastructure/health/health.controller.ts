import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

export interface HealthResponse {
  status: 'ok';
}

@Controller('health')
@ApiTags('health')
export class HealthController {
  @Get()
  @ApiOkResponse({ description: 'The API is running.' })
  check(): HealthResponse {
    return { status: 'ok' };
  }
}
