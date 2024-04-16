import { Module } from '@nestjs/common';
import { InspectionAndAcceptanceReportService } from './inspection-and-acceptance-report.service';
import { InspectionAndAcceptanceReportController } from './inspection-and-acceptance-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionAndAcceptanceReport } from './entities/inspection-and-acceptance-report.entity';
import { InspectionAndAcceptanceReportItems } from './entities/inspection-and-acceptance-report-items.entity';
import { InspectionAndAcceptanceReportSubItems } from './entities/inspection-and-acceptance-report-sub-items.entity';
import { InspectionAndAcceptanceReportItemsView } from './entities/inspection-and-acceptance-report-items.view.entity';
import { InventoryLedger } from '../inventory/entities/inventory-ledger.entiry';
import { InventoryLedgerSubItems } from '../inventory/entities/inventory-ledger-sub-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionAndAcceptanceReport, InspectionAndAcceptanceReportItems, InspectionAndAcceptanceReportSubItems, InspectionAndAcceptanceReportItemsView, InventoryLedger, InventoryLedgerSubItems])],
  controllers: [InspectionAndAcceptanceReportController],
  providers: [InspectionAndAcceptanceReportService],
  exports: [InspectionAndAcceptanceReportService]
})
export class InspectionAndAcceptanceReportModule { }
