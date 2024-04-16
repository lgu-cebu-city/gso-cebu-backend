import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAccountBudgetDto } from '../accountbudget/dto/get-accountbudget.dto';
import { AppropriationService } from './appropriation.service';
import { CreateAppropriationDto } from './dto/create-appropriation.dto';
import { UpdateAppropriationDto } from './dto/update-appropriation.dto';

@ApiTags('Appropriation')
@Controller({ path: 'appropriation', version: '1' })
export class AppropriationController {
  constructor(private readonly appropriationService: AppropriationService) {}

  @Post()
  create(@Body() createAppropriationDto: CreateAppropriationDto) {
    return this.appropriationService.create(createAppropriationDto);
  }

  @Get()
  findAll() {
    return this.appropriationService.findAll();
  }

  @Post('by-sofids')
  findByIDs(@Body() sofIds: string[]) {
    return this.appropriationService.findMany(sofIds);
  }

  @Get('by-year/:year')
  findAllByYear(@Param('year') year: string) {
    return this.appropriationService.findAllByYear(year);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appropriationService.findOne(id);
  }

  @Post('by-deptsofcatyear')
  findByDept(@Body() getAccountBudgetDto: GetAccountBudgetDto) {
    return this.appropriationService.findByDeptSofCatYear(
      getAccountBudgetDto.SOF,
      getAccountBudgetDto.DepartmentName,
      getAccountBudgetDto.Category,
      getAccountBudgetDto.BYear.toString()
    );
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAppropriationDto: UpdateAppropriationDto) {
    return this.appropriationService.update(id, updateAppropriationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appropriationService.remove(id);
  }
}
