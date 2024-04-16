import { Module } from '@nestjs/common';
import { SOFService } from './sof.service';
import { SOFController } from './sof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOF } from './entities/sof.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SOF])],
  controllers: [SOFController],
  providers: [SOFService],
  exports: [SOFService]
})
export class SOFModule { }
