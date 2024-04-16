import { Module } from '@nestjs/common';
import { RequestQuotationService } from './request-quotation.service';
import { RequestQuotationController } from './request-quotation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestQuotation } from './entities/request-quotation.entity';
import { RequestQuotationItemDetails } from './entities/request-quotation-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestQuotation, RequestQuotationItemDetails])],
  controllers: [RequestQuotationController],
  providers: [RequestQuotationService],
  exports: [RequestQuotationService]
})
export class RequestQuotationModule { }
