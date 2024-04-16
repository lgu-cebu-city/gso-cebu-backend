import { PartialType } from '@nestjs/swagger';
import { CreatePropertyRequisitionSlipDto } from './create-property-requisition-slip.dto';

export class UpdatePropertyRequisitionSlipDto extends PartialType(CreatePropertyRequisitionSlipDto) {}
