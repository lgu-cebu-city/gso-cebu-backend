import { PartialType } from '@nestjs/swagger';
import { CreateInspectionAndAcceptanceReportDto } from './create-inspection-and-acceptance-report.dto';

export class UpdateInspectionAndAcceptanceReportDto extends PartialType(CreateInspectionAndAcceptanceReportDto) {}
