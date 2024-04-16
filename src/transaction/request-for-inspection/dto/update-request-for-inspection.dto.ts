import { PartialType } from '@nestjs/swagger';
import { CreateRequestForInspectionDto } from './create-request-for-inspection.dto';

export class UpdateRequestForInspectionDto extends PartialType(CreateRequestForInspectionDto) {}
