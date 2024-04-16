import { Module } from '@nestjs/common';
import { PropertyReturnSlipService } from './property-return-slip.service';
import { PropertyReturnSlipController } from './property-return-slip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyReturnSlip } from './entities/property-return-slip.entity';
import { PropertyReturnSlipItemDetails } from './entities/property-return-slip-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyReturnSlip, PropertyReturnSlipItemDetails])],
  controllers: [PropertyReturnSlipController],
  providers: [PropertyReturnSlipService],
  exports: [PropertyReturnSlipService]
})
export class PropertyReturnSlipModule { }
