import { Module } from '@nestjs/common';
import { UnitConversionService } from './unit-conversion.service';
import { UnitConversionController } from './unit-conversion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitConversion } from './entities/unit-conversion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitConversion])],
  controllers: [UnitConversionController],
  providers: [UnitConversionService],
  exports: [UnitConversionService]
})
export class UnitConversionModule { }
