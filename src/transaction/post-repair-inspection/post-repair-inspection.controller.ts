import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostRepairInspectionService } from './post-repair-inspection.service';
import { CreatePostRepairInspectionDto } from './dto/create-post-repair-inspection.dto';
import { UpdatePostRepairInspectionDto } from './dto/update-post-repair-inspection.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PostRepairInspection')
@Controller({ path: 'post-repair-inspection', version: '1' })
export class PostRepairInspectionController {
  constructor(private readonly postRepairInspectionService: PostRepairInspectionService) { }

  @Post()
  create(@Body() createPostRepairInspectionDto: CreatePostRepairInspectionDto) {
    return this.postRepairInspectionService.create(createPostRepairInspectionDto);
  }

  @Get()
  findAll() {
    return this.postRepairInspectionService.findAll();
  }

  @Get('byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.postRepairInspectionService.findAllByMonthYear(date);
  }

  @Get('all/forWaste')
  findAllForWaste() {
    return this.postRepairInspectionService.findAllForWaste();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postRepairInspectionService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.postRepairInspectionService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostRepairInspectionDto: UpdatePostRepairInspectionDto) {
    return this.postRepairInspectionService.update(id, updatePostRepairInspectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postRepairInspectionService.remove(id);
  }
}
