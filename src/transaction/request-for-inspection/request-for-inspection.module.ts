import { Module } from '@nestjs/common';
import { RequestForInspectionService } from './request-for-inspection.service';
import { RequestForInspectionController } from './request-for-inspection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestForInspection } from './entities/request-for-inspection.entity';
import { RequestForInspectionItemDetails } from './entities/request-for-inspection-item-details.entity';
import { RequestForInspectionType } from './entities/request-for-inspection-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestForInspection, RequestForInspectionItemDetails, RequestForInspectionType])],
  controllers: [RequestForInspectionController],
  providers: [RequestForInspectionService],
  exports: [RequestForInspectionService]
})
export class RequestForInspectionModule { }
