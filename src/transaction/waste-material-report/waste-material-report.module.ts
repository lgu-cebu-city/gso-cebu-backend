import { Module } from '@nestjs/common';
import { WasteMaterialReportService } from './waste-material-report.service';
import { WasteMaterialReportController } from './waste-material-report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteMaterialReport } from './entities/waste-material-report.entity';
import { WasteMaterialReportItemDetails } from './entities/waste-material-report-item-details.entity';
import { WasteMaterialReportInspectionCertificate } from './entities/waste-material-report-inspection-certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WasteMaterialReport, WasteMaterialReportItemDetails, WasteMaterialReportInspectionCertificate])],
  controllers: [WasteMaterialReportController],
  providers: [WasteMaterialReportService],
  exports: [WasteMaterialReportService]
})
export class WasteMaterialReportModule { }
