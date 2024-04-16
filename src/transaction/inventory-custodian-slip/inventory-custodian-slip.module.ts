import { Module } from '@nestjs/common';
import { InventoryCustodianSlipService } from './inventory-custodian-slip.service';
import { InventoryCustodianSlipController } from './inventory-custodian-slip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryCustodianSlip } from './entities/inventory-custodian-slip.entity';
import { InventoryCustodianSlipItems } from './entities/inventory-custodian-slip-items.entity';
import { InventoryCustodianSlipSubItems } from './entities/inventory-custodian-slip-sub-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryCustodianSlip, InventoryCustodianSlipItems, InventoryCustodianSlipSubItems])],
  controllers: [InventoryCustodianSlipController],
  providers: [InventoryCustodianSlipService],
  exports: [InventoryCustodianSlipService]
})
export class InventoryCustodianSlipModule { }
