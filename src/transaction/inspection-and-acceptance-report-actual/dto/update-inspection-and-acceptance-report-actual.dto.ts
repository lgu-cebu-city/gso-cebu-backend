import { PartialType } from '@nestjs/swagger';
import { CreateInspectionAndAcceptanceReportActualDto } from './create-inspection-and-acceptance-report-actual.dto';

export class UpdateInspectionAndAcceptanceReportActualDto extends PartialType(CreateInspectionAndAcceptanceReportActualDto) {}
