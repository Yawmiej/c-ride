import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('rides')
@ApiTags('rides')
export class RidesController {}
