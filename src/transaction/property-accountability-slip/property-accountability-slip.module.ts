import { Module } from '@nestjs/common';
import { PropertyAccountabilitySlipService } from './property-accountability-slip.service';
import { PropertyAccountabilitySlipController } from './property-accountability-slip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyAccountabilitySlip } from './entities/property-accountability-slip.entity';
import { PropertyAccountabilitySlipItemDetails } from './entities/property-accountability-slip-item-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyAccountabilitySlip, PropertyAccountabilitySlipItemDetails])],
  controllers: [PropertyAccountabilitySlipController],
  providers: [PropertyAccountabilitySlipService],
  exports: [PropertyAccountabilitySlipService]
})
export class PropertyAccountabilitySlipModule { }
