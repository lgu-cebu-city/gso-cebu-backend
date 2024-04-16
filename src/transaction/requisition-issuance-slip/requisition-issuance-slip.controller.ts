import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequisitionIssuanceSlipService } from './requisition-issuance-slip.service';
import { CreateRequisitionIssuanceSlipDto } from './dto/create-requisition-issuance-slip.dto';
import { UpdateRequisitionIssuanceSlipDto } from './dto/update-requisition-issuance-slip.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RequisitionIssuanceSlip')
@Controller({ path: 'requisition-issuance-slip', version: '1' })
export class RequisitionIssuanceSlipController {
  constructor(private readonly requisitionIssuanceService: RequisitionIssuanceSlipService) { }

  @Post()
  create(@Body() createRequisitionIssuanceSlipDto: CreateRequisitionIssuanceSlipDto) {
    return this.requisitionIssuanceService.create(createRequisitionIssuanceSlipDto);
  }

  @Get('transactiontype/:transType')
  findAllByTransType(@Param('transType') _transType: string) {
    return this.requisitionIssuanceService.findAllByTransType(_transType);
  }

  @Get('issuancetype/:issuanceType')
  findAllByIssuanceType(@Param('issuanceType') _issuanceType: string) {
    return this.requisitionIssuanceService.findAllByIssuanceType(_issuanceType);
  }

  @Get('issuance/all')
  findAllIssuance() {
    return this.requisitionIssuanceService.findAllIssuance();
  }

  @Get()
  findAll() {
    return this.requisitionIssuanceService.findAll();
  }

  @Get('byDepartment/:deptId/transactiontype/:transType')
  findAllByTransTypeByDepartment(@Param('deptId') deptId: string, @Param('transType') _transType: string) {
    return this.requisitionIssuanceService.findAllByTransTypeByDepartment(_transType, deptId);
  }

  @Get('byDepartment/:deptId/issuancetype/:issuanceType')
  findAllByIssuanceTypeByDepartment(@Param('deptId') deptId: string, @Param('issuanceType') _issuanceType: string) {
    return this.requisitionIssuanceService.findAllByIssuanceTypeByDepartment(_issuanceType, deptId);
  }

  @Get('byDepartment/:deptId/issuance/all')
  findAllIssuanceByDepartment(@Param('deptId') deptId: string) {
    return this.requisitionIssuanceService.findAllIssuanceByDepartment(deptId);
  }

  @Get('byDepartment/:deptId')
  findAllByDepartment(@Param('deptId') deptId: string) {
    return this.requisitionIssuanceService.findAllByDepartment(deptId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requisitionIssuanceService.findOne(id);
  }

  @Get('transactionNo/transNo')
  getTransactionNo() {
    return this.requisitionIssuanceService.getTransactionNo();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequisitionIssuanceSlipDto: UpdateRequisitionIssuanceSlipDto) {
    return this.requisitionIssuanceService.update(id, updateRequisitionIssuanceSlipDto);
  }

  @Patch('update-issuance/:id')
  updateForIssuance(@Param('id') id: string, @Body() updateRequisitionIssuanceSlipDto: UpdateRequisitionIssuanceSlipDto) {
    return this.requisitionIssuanceService.updateForIssuance(id, updateRequisitionIssuanceSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requisitionIssuanceService.remove(id);
  }
}
