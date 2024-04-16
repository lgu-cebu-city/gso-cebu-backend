import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountBudgetService } from './accountbudget.service';
import { CreateAccountBudgetDto } from './dto/create-accountbudget.dto';
import { UpdateAccountBudgetDto } from './dto/update-accountbudget.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAccountBudgetDto } from './dto/get-accountbudget.dto';

@ApiTags('AccountBudget')
@Controller({ path: 'accountbudget', version: '1' })
export class AccountBudgetController {
  constructor(private readonly accountbudgetService: AccountBudgetService) { }

  @Post()
  create(@Body() createAccountBudgetDto: CreateAccountBudgetDto) {
    return this.accountbudgetService.create(createAccountBudgetDto);
  }

  @Get()
  findAll() {
    return this.accountbudgetService.findAll();
  }

  @Post('by-sofids')
  findByIDs(@Body() sofIds: string[]) {
    return this.accountbudgetService.findMany(sofIds);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountbudgetService.findOne(id);
  }

  @Post('by-deptsofcatyear')
  findByDept(@Body() getAccountBudgetDto: GetAccountBudgetDto) {
    return this.accountbudgetService.findByDeptSofCatYear(
      getAccountBudgetDto.SOF,
      getAccountBudgetDto.DepartmentName,
      getAccountBudgetDto.Category,
      getAccountBudgetDto.BYear.toString()
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountBudgetDto: UpdateAccountBudgetDto) {
    return this.accountbudgetService.update(id, updateAccountBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountbudgetService.remove(id);
  }
}
