import { PartialType } from '@nestjs/swagger';
import { CreateBarangayIssuanceDto } from './create-barangay-issuance.dto';

export class UpdateBarangayIssuanceDto extends PartialType(CreateBarangayIssuanceDto) {}
