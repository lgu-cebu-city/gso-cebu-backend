import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbstractOfCanvassService } from './abstract-of-canvass.service';
import { CreateAbstractOfCanvassDto } from './dto/create-abstract-of-canvass.dto';
import { UpdateAbstractOfCanvassDto } from './dto/update-abstract-of-canvass.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AbstractOfCanvass')
@Controller({ path: 'abstract-of-canvass', version: '1' })
export class AbstractOfCanvassController {
  constructor(private readonly abstractOfCanvassService: AbstractOfCanvassService) { }

  @Post()
  create(@Body() createAbstractOfCanvassDto: CreateAbstractOfCanvassDto) {
    return this.abstractOfCanvassService.create(createAbstractOfCanvassDto);
  }

  @Get('find-all')
  findAll() {
    return this.abstractOfCanvassService.findAll();
  }

  @Get('find-all/byMonthYear/:date')
  findAllByMonthYear(@Param('date') date: Date) {
    return this.abstractOfCanvassService.findAllByMonthYear(date);
  }

  @Get('find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.abstractOfCanvassService.findOne(id);
  }

  @Get('project/:id')
  findProject(@Param('id') id: string) {
    return this.abstractOfCanvassService.findProject(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.abstractOfCanvassService.getTransactionNo();
  }

  @Get('listApprovedCanvass')
  findCanvass() {
    return this.abstractOfCanvassService.findApprovedCanvass();
  }

  @Get('listApprovedCanvass/byMonthYear/:date')
  findApprovedCanvassByMonthYear(@Param('date') date: Date) {
    return this.abstractOfCanvassService.findApprovedCanvassByMonthYear(date);
  }

  @Get('listApprovedCanvass/byMonthYear/forPO/:date')
  findApprovedCanvassForPOByMonthYear(@Param('date') date: Date) {
    return this.abstractOfCanvassService.findApprovedCanvassForPOByMonthYear(date);
  }

  @Get('approvedCanvass/:id')
  findCanvassById(@Param('id') id: string) {
    return this.abstractOfCanvassService.findApprovedCanvassById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAbstractOfCanvassDto: UpdateAbstractOfCanvassDto) {
    return this.abstractOfCanvassService.update(id, updateAbstractOfCanvassDto);
  }

  @Patch('awarded/:id/:value')
  updateAwarded(@Param('id') id: string, @Param('value') value: boolean) {
    return this.abstractOfCanvassService.updateAwarded(id, value);
  }

  @Patch('approved/:id/:value')
  updateApproved(@Param('id') id: string, @Param('value') value: boolean) {
    return this.abstractOfCanvassService.updateApproved(id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstractOfCanvassService.remove(id);
  }
}
