import { PartialType } from '@nestjs/swagger';
import { CreateRequisitionIssuanceSlipDto } from './create-requisition-issuance-slip.dto';

export class UpdateRequisitionIssuanceSlipDto extends PartialType(CreateRequisitionIssuanceSlipDto) {}
