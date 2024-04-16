import { Module } from '@nestjs/common';
import { InspectionAndAcceptanceReportActualService } from './inspection-and-acceptance-report-actual.service';
import { InspectionAndAcceptanceReportActualController } from './inspection-and-acceptance-report-actual.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionAndAcceptanceReportActual } from './entities/inspection-and-acceptance-report-actual.entity';
import { InspectionAndAcceptanceReportActualItems } from './entities/inspection-and-acceptance-report-actual-items.entity';
import { InspectionAndAcceptanceReportActualSubItems } from './entities/inspection-and-acceptance-report-actual-sub-items.entity';
import { InspectionAndAcceptanceReportActualItemsView } from './entities/inspection-and-acceptance-report-actual-items.view.entity';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionAndAcceptanceReportActual, InspectionAndAcceptanceReportActualItems, InspectionAndAcceptanceReportActualSubItems, InspectionAndAcceptanceReportActualItemsView, InventoryLedger])],
  controllers: [InspectionAndAcceptanceReportActualController],
  providers: [InspectionAndAcceptanceReportActualService],
  exports: [InspectionAndAcceptanceReportActualService]
})
export class InspectionAndAcceptanceReportActualModule { }
