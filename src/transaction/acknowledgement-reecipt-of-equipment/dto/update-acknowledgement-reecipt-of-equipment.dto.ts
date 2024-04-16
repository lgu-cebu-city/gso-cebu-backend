import { PartialType } from '@nestjs/swagger';
import { CreateAcknowledgementReceiptOfEquipmentDto } from './create-acknowledgement-reecipt-of-equipment.dto';

export class UpdateAcknowledgementReceiptOfEquipmentDto extends PartialType(CreateAcknowledgementReceiptOfEquipmentDto) {}
