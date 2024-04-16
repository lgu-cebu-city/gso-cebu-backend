import { Module } from '@nestjs/common';
import { FundCategoryService } from './fund-category.service';
import { FundCategoryController } from './fund-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundCategory } from './entities/fund-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundCategory])],
  controllers: [FundCategoryController],
  providers: [FundCategoryService],
  exports: [FundCategoryService]
})
export class FundCategoryModule { }
