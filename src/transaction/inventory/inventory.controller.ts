import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryReportViewService } from './inventory.service';

@ApiTags('InventoryReportView')
@Controller({ path: 'inventory-report', version: '1' })
export class InventoryReportViewController {
  constructor(private readonly projectProposalService: InventoryReportViewService) { }

  @Get('find-all')
  findAll() {
    return this.projectProposalService.findAll();
  }
  @Get('find-all-by-department/:deptId')
  findAllByDepartment(@Param('deptId') deptId: string) {
    return this.projectProposalService.findAllByDepartment(deptId);
  }
  @Get('find-all-by-type/:typeId')
  findAllByType(@Param('typeId') typeId: string) {
    return this.projectProposalService.findAllByType(typeId);
  }
  @Get('find-all-medicine')
  findAllMedicine() {
    return this.projectProposalService.findAllMedicine();
  }
  @Get('find-all-by-type-department/:typeId/:deptId')
  findAllByTypeDepartment(@Param('typeId') typeId: string, @Param('deptId') deptId: string) {
    return this.projectProposalService.findAllByTypeDepartment(typeId, deptId);
  }
  @Get('find-all-medicine-by-department/:deptId')
  findAllMedicineByDepartment(@Param('deptId') deptId: string) {
    return this.projectProposalService.findAllMedicineByDepartment(deptId);
  }
  @Get('find-all-property')
  findAllProperty() {
    return this.projectProposalService.findAllProperty();
  }
  
  @Get('find-medicine')
  findMedicine() {
    return this.projectProposalService.findMedicine();
  }
  
  @Get('find-medicine-test')
  findMedicineTest() {
    return this.projectProposalService.findMedicineTest();
  }
  
  @Get('find-medicine/:itemId')
  findMedicineById(@Param('itemId') itemId: string) {
    return this.projectProposalService.findMedicineById(itemId);
  }
  
  @Get('find-medicine-brand/:brandId')
  findMedicineByBrandId(@Param('brandId') brandId: string) {
    return this.projectProposalService.findMedicineByBrandId(brandId);
  }

  @Get('ics/:price')
  findAllICS(@Param('price') price: number) {
    return this.projectProposalService.findAllICS(price);
  }

  @Get('ssmi/:year')
  findAllSSMI(@Param('year') _year: number) {
    return this.projectProposalService.findAllSSMI(_year);
  }

  @Get('find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.projectProposalService.findOne(id);
  }

  @Get('find-by-deptId/:deptId')
  findbyDept(@Param('deptId') deptId: string) {
    return this.projectProposalService.findbyDept(deptId);
  }
}
