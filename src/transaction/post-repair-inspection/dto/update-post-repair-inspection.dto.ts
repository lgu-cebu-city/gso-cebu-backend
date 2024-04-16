import { PartialType } from '@nestjs/swagger';
import { CreatePostRepairInspectionDto } from './create-post-repair-inspection.dto';

export class UpdatePostRepairInspectionDto extends PartialType(CreatePostRepairInspectionDto) {}
