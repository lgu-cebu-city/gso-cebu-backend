import { PartialType } from '@nestjs/swagger';
import { CreateBarangayDto } from './create-barangay.dto';

export class UpdateBarangayDto extends PartialType(CreateBarangayDto) {}
