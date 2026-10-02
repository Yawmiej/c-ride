import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('drivers')
@ApiTags('drivers')
export class DriversController {}
