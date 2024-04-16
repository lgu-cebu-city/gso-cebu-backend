import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemRelation } from './entities/item-relation.entity';
import { ItemPsdbm } from './entities/item_psdbm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemRelation, ItemPsdbm])],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule { }
