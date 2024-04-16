import { PartialType } from '@nestjs/swagger';
import { CreatePreRepairInspectionDto } from './create-pre-repair-inspection.dto';

export class UpdatePreRepairInspectionDto extends PartialType(CreatePreRepairInspectionDto) {}
