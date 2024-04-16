import { Module } from '@nestjs/common';
import { AcknowledgementReceiptOfEquipmentService } from './acknowledgement-reecipt-of-equipment.service';
import { AcknowledgementReceiptOfEquipmentController } from './acknowledgement-reecipt-of-equipment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcknowledgementReceiptOfEquipment } from './entities/acknowledgement-reecipt-of-equipment.entity';
import { AcknowledgementReceiptOfEquipmentItems } from './entities/acknowledgement-reecipt-of-equipment-items.entity';
import { AcknowledgementReceiptOfEquipmentSubItems } from './entities/acknowledgement-reecipt-of-equipment-sub-items.entity';
import { AcknowledgementReceiptOfEquipmentItemsView } from './entities/acknowledgement-reecipt-of-equipment-items.view.entity';
import { AcknowledgementReceiptOfEquipmentInspectedItemsView } from './entities/acknowledgement-reecipt-of-equipment-inspected-items.view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcknowledgementReceiptOfEquipment, AcknowledgementReceiptOfEquipmentItems, AcknowledgementReceiptOfEquipmentItemsView, AcknowledgementReceiptOfEquipmentInspectedItemsView, AcknowledgementReceiptOfEquipmentSubItems])],
  controllers: [AcknowledgementReceiptOfEquipmentController],
  providers: [AcknowledgementReceiptOfEquipmentService],
  exports: [AcknowledgementReceiptOfEquipmentService]
})
export class AcknowledgementReceiptOfEquipmentModule { }
