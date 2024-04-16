import { PartialType } from '@nestjs/swagger';
import { CreateRequestQuotationDto } from './create-request-quotation.dto';

export class UpdateRequestQuotationDto extends PartialType(CreateRequestQuotationDto) {}
