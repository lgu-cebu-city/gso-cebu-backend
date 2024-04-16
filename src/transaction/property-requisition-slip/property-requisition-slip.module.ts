import { Module } from '@nestjs/common';
import { PropertyRequisitionSlipService } from './property-requisition-slip.service';
import { PropertyRequisitionSlipController } from './property-requisition-slip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyRequisitionSlip } from './entities/property-requisition-slip.entity';
import { PropertyRequisitionSlipItemDetails } from './entities/property-requisition-slip-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyRequisitionSlip, PropertyRequisitionSlipItemDetails])],
  controllers: [PropertyRequisitionSlipController],
  providers: [PropertyRequisitionSlipService],
  exports: [PropertyRequisitionSlipService]
})
export class PropertyRequisitionSlipModule { }
