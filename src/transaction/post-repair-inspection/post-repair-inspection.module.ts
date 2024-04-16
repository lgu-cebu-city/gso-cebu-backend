import { Module } from '@nestjs/common';
import { PostRepairInspectionService } from './post-repair-inspection.service';
import { PostRepairInspectionController } from './post-repair-inspection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepairInspection } from './entities/post-repair-inspection.entity';
import { PostRepairInspectionItemDetails } from './entities/post-repair-inspection-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepairInspection, PostRepairInspectionItemDetails])],
  controllers: [PostRepairInspectionController],
  providers: [PostRepairInspectionService],
  exports: [PostRepairInspectionService]
})
export class PostRepairInspectionModule { }
