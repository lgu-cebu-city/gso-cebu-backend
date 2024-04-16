import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Item')
@Controller({ path: 'item', version: '1' })
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('medical/all')
  findAllMedicalItems() {
    return this.itemService.findAllMedicalItems();
  }

  @Get('items/all')
  findAllItems() {
    return this.itemService.findAllItems();
  }

  @Get('category/:category')
  findCategory(@Param('category') _category: string) {
    return this.itemService.findCategory(_category);
  }

  @Get('medical/category/:category')
  findMedicalCategory(@Param('category') _category: string) {
    return this.itemService.findMedicalCategory(_category);
  }

  @Get('non-invty/all')
  findAllNonInvty() {
    return this.itemService.findAllNonInvty();
  }

  @Get('non-invty/category/:category')
  findCategoryNonInvty(@Param('category') _category: string) {
    return this.itemService.findCategoryNonInvty(_category);
  }

  @Get('category/:category/type/:type')
  findCategoryType(@Param('category') _category: string, @Param('type') _type: string) {
    return this.itemService.findCategoryType(_category, _type);
  }

  @Get('category/:category/type/:type/department/:deptId')
  findCategoryTypeByDepartment(@Param('category') _category: string, @Param('type') _type: string, @Param('deptId') _deptId: string) {
    return this.itemService.findCategoryTypeByDepartment(_category, _type, _deptId);
  }

  @Get('categoryTypeAll/:category')
  findCategoryTypeAll(@Param('category') _category: string) {
    return this.itemService.findCategoryTypeAll(_category);
  }

  @Get('categoryTypeAll/:category/department/:deptId')
  findCategoryTypeAllByDepartment(@Param('category') _category: string, @Param('deptId') _deptId: string) {
    return this.itemService.findCategoryTypeAllByDepartment(_category, _deptId);
  }

  @Get('itemRelation/category/:category/id/:id')
  findItemRelation(@Param('category') _category: string, @Param('id') _id: string) {
    return this.itemService.findItemRelation(_category, _id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Get('itemCode/:itemCode')
  findItemByCode(@Param('itemCode') _itemCode: string) {
    return this.itemService.findItemByCode(_itemCode);
  }

  @Get('transactionNo/transNo/:prefix')
  getTransactionNo(@Param('prefix') _prefix: string) {
    return this.itemService.getTransactionNo(_prefix);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Patch('lock-item/:id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.itemService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
