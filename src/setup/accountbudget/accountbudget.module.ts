import { Module } from '@nestjs/common';
import { AccountBudgetService } from './accountbudget.service';
import { AccountBudgetController } from './accountbudget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountBudget } from './entities/accountbudget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountBudget])],
  controllers: [AccountBudgetController],
  providers: [AccountBudgetService],
  exports: [AccountBudgetService]
})
export class AccountBudgetModule { }
