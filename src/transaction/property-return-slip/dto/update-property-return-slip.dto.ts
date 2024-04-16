import { PartialType } from '@nestjs/swagger';
import { CreatePropertyReturnSlipDto } from './create-property-return-slip.dto';

export class UpdatePropertyReturnSlipDto extends PartialType(CreatePropertyReturnSlipDto) {}
