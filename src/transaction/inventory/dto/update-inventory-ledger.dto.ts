import { PartialType } from '@nestjs/swagger';
import { CreateInventoryLedgerDto } from './create-inventory-ledger.dto';

export class UpdateInventoryLedgerDto extends PartialType(CreateInventoryLedgerDto) {}
