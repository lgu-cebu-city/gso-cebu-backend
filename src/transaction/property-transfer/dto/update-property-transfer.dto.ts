import { PartialType } from '@nestjs/swagger';
import { CreatePropertyTransferDto } from './create-property-transfer.dto';

export class UpdatePropertyTransferDto extends PartialType(CreatePropertyTransferDto) {}
