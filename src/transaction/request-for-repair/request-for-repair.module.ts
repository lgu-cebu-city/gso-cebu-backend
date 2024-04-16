import { Module } from '@nestjs/common';
import { RequestForRepairService } from './request-for-repair.service';
import { RequestForRepairController } from './request-for-repair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestForRepair } from './entities/request-for-repair.entity';
import { RequestForRepairItemDetails } from './entities/request-for-repair-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestForRepair, RequestForRepairItemDetails])],
  controllers: [RequestForRepairController],
  providers: [RequestForRepairService],
  exports: [RequestForRepairService]
})
export class RequestForRepairModule { }
