import { Module } from '@nestjs/common';
import { PreRepairInspectionService } from './pre-repair-inspection.service';
import { PreRepairInspectionController } from './pre-repair-inspection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreRepairInspection } from './entities/pre-repair-inspection.entity';
import { PreRepairInspectionItemDetails } from './entities/pre-repair-inspection-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PreRepairInspection, PreRepairInspectionItemDetails])],
  controllers: [PreRepairInspectionController],
  providers: [PreRepairInspectionService],
  exports: [PreRepairInspectionService]
})
export class PreRepairInspectionModule { }
