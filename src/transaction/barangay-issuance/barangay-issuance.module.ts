import { Module } from '@nestjs/common';
import { BarangayIssuanceService } from './barangay-issuance.service';
import { BarangayIssuanceController } from './barangay-issuance.controller';
import { BarangayIssuance } from './entities/barangay-issuance.entity';
import { BarangayIssuanceItemDetails } from './entities/barangay-issuance-item-details.entity';
import { BarangayIssuanceItemBatchDetails } from './entities/barangay-issuance-item-batch-details.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([BarangayIssuance, BarangayIssuanceItemDetails, BarangayIssuanceItemBatchDetails, InventoryLedger])],
  controllers: [BarangayIssuanceController],
  providers: [BarangayIssuanceService],
  exports: [BarangayIssuanceService]
})
export class BarangayIssuanceModule {}
