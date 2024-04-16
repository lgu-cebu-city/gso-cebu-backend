import { PartialType } from '@nestjs/swagger';
import { CreateInventoryCustodianSlipDto } from './create-inventory-custodian-slip.dto';

export class UpdateInventoryCustodianSlipDto extends PartialType(CreateInventoryCustodianSlipDto) {}
