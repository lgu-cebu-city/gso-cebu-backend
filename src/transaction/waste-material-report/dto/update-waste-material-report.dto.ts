import { PartialType } from '@nestjs/swagger';
import { CreateWasteMaterialReportDto } from './create-waste-material-report.dto';

export class UpdateWasteMaterialReportDto extends PartialType(CreateWasteMaterialReportDto) {}
