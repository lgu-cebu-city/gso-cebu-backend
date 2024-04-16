import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GenBarangayService } from './gen-barangay.service'; 

@ApiTags('General Barangay')
@Controller({path:'gen-barangay', version:'1'})
export class GenBarangayController {
  constructor(private readonly genBarangayService: GenBarangayService) {}

  @Get()
  findAll() {
    return this.genBarangayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genBarangayService.findOne(id);
  }
 
}
