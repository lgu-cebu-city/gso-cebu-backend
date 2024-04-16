import { Module } from '@nestjs/common';
import { BarangayService } from './barangay.service';
import { BarangayController } from './barangay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barangay } from './entities/barangay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barangay])],
  controllers: [BarangayController],
  providers: [BarangayService],
  exports: [BarangayService]
})
export class BarangayModule { }
