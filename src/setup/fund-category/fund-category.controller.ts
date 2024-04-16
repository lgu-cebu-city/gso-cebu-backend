import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundCategoryService } from './fund-category.service';
import { CreateFundCategoryDto } from './dto/create-fund-category.dto';
import { UpdateFundCategoryDto } from './dto/update-fund-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FundCategory')
@Controller({ path: 'fundCategory', version: '1' })
export class FundCategoryController {
  constructor(private readonly fundCategoryService: FundCategoryService) { }

  @Post()
  create(@Body() createFundCategoryDto: CreateFundCategoryDto) {
    return this.fundCategoryService.create(createFundCategoryDto);
  }

  @Get()
  findAll() {
    return this.fundCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fundCategoryService.findOne(id);
  }

  @Get('fundId/:fundId')
  findByFundId(@Param('fundId') _fundId: number) {
    return this.fundCategoryService.findByFundId(_fundId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFundCategoryDto: UpdateFundCategoryDto) {
    return this.fundCategoryService.update(id, updateFundCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.fundCategoryService.remove(id);
  }
}
