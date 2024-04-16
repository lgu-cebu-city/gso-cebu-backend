import { Module } from '@nestjs/common';
import { PropertyTransferService } from './property-transfer.service';
import { PropertyTransferController } from './property-transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyTransfer } from './entities/property-transfer.entity';
import { PropertyTransferItemDetails } from './entities/property-transfer-item-details.entity';
import { PropertyTransferItemBatchDetails } from './entities/poperty-transfer-item-batch-details.entity';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyTransfer, PropertyTransferItemDetails, PropertyTransferItemBatchDetails, InventoryLedger])],
  controllers: [PropertyTransferController],
  providers: [PropertyTransferService],
  exports: [PropertyTransferService]
})
export class PropertyTransferModule { }
