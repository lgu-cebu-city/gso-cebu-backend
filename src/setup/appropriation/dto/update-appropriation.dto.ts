import { PartialType } from '@nestjs/swagger';
import { CreateAppropriationDto } from './create-appropriation.dto';

export class UpdateAppropriationDto extends PartialType(CreateAppropriationDto) {}
