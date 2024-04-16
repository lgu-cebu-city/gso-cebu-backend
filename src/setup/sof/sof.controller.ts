import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SOFService } from './sof.service';
import { CreateSOFDto } from './dto/create-sof.dto';
import { UpdateSOFDto } from './dto/update-sof.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SOF')
@Controller({ path: 'sof', version: '1' })
export class SOFController {
  constructor(private readonly sofService: SOFService) { }

  @Post()
  create(@Body() createSOFDto: CreateSOFDto) {
    return this.sofService.create(createSOFDto);
  }

  @Get()
  findAll() {
    return this.sofService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sofService.findOne(id);
  }

  @Get('by-sof/:sofId')
  findByDept(@Param('sofId') sofId: string) {
    return this.sofService.findByDept(sofId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSOFDto: UpdateSOFDto) {
    return this.sofService.update(id, updateSOFDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sofService.remove(id);
  }
}
