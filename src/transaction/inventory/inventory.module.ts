import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/setup/item/entities/item.entity';
import { InventoryLedger } from './entities/inventory-ledger.entiry';
import { PropertyInventoryView } from './entities/inventory-property.view.entity';
import { InventoryReportDepartmentView } from './entities/inventory-report-department.view.entity';
import { InventoryReportDetailsView } from './entities/inventory-report-details.view.entity';
import { InventoryReportView } from './entities/inventory-report.view.entity';
import { InventoryReportViewController } from './inventory.controller';
import { InventoryReportViewService } from './inventory.service';
import { InventoryLedgerSubItems } from './entities/inventory-ledger-sub-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryReportView, InventoryReportDepartmentView, InventoryReportDetailsView, PropertyInventoryView, InventoryLedger, InventoryLedgerSubItems, Item])],
  controllers: [InventoryReportViewController],
  providers: [InventoryReportViewService],
  exports: [InventoryReportViewService]
})
export class InventoryReportModule { }
