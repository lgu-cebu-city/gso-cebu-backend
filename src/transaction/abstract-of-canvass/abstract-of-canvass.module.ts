import { Module } from '@nestjs/common';
import { AbstractOfCanvassService } from './abstract-of-canvass.service';
import { AbstractOfCanvassController } from './abstract-of-canvass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractOfCanvass } from './entities/abstract-of-canvass.entity';
import { AbstractOfCanvassItemDetails } from './entities/abstract-of-canvass-item-details.entity';
import { AbstractOfCanvassSupplierDetails } from './entities/abstract-of-canvass-supplier-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbstractOfCanvass, AbstractOfCanvassSupplierDetails, AbstractOfCanvassItemDetails])],
  controllers: [AbstractOfCanvassController],
  providers: [AbstractOfCanvassService],
  exports: [AbstractOfCanvassService]
})
export class AbstractOfCanvassModule { }
