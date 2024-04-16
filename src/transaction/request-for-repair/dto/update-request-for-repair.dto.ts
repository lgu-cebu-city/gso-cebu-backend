import { PartialType } from '@nestjs/swagger';
import { CreateRequestForRepairDto } from './create-request-for-repair.dto';

export class UpdateRequestForRepairDto extends PartialType(CreateRequestForRepairDto) {}
