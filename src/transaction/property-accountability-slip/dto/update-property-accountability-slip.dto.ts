import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAccountabilitySlipDto } from './create-property-accountability-slip.dto';

export class UpdatePropertyAccountabilitySlipDto extends PartialType(CreatePropertyAccountabilitySlipDto) {}
