import { Module } from '@nestjs/common';
import { GenBarangayService } from './gen-barangay.service';
import { GenBarangayController } from './gen-barangay.controller';

@Module({
  controllers: [GenBarangayController],
  providers: [GenBarangayService]
})
export class GenBarangayModule {}
