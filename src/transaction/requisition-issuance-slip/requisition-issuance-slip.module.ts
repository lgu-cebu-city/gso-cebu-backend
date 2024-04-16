import { Module } from '@nestjs/common';
import { RequisitionIssuanceSlipService } from './requisition-issuance-slip.service';
import { RequisitionIssuanceSlipController } from './requisition-issuance-slip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitionIssuanceSlip } from './entities/requisition-issuance-slip.entity';
import { RequisitionIssuanceSlipItemDetails } from './entities/requisition-issuance-slip-item-details.entity';
import { RequisitionIssuanceSlipItemBatchDetails } from './entities/requisition-issuance-slip-item-batch-details.entity';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([RequisitionIssuanceSlip, RequisitionIssuanceSlipItemDetails, RequisitionIssuanceSlipItemBatchDetails, InventoryLedger])],
  controllers: [RequisitionIssuanceSlipController],
  providers: [RequisitionIssuanceSlipService],
  exports: [RequisitionIssuanceSlipService]
})
export class RequisitionIssuanceSlipModule { }
