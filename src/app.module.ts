import { Global, Module } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { UserModule } from "./auth/user/user.module";
import { OfficeModule } from "./setup/office/office.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "./interceptors/response-interceptor";
import { ItemModule } from "./setup/item/item.module";
import { GroupModule } from "./setup/group/group.module";
import { TypeModule } from "./setup/type/type.module";
import { AccountBudgetModule } from "./setup/accountbudget/accountbudget.module";
import { DepartmentModule } from "./setup/department/department.module";
import { FundCategoryModule } from "./setup/fund-category/fund-category.module";
import { ProjectProposalModule } from "./transaction/project-proposal/project-proposal.module";
import { SOFModule } from "./setup/sof/sof.module";
import { PurchaseRequestModule } from "./transaction/purchase-request/purchase-request.module";
import { RequestQuotationModule } from "./transaction/request-quotation/request-quotation.module";
import { SupplierModule } from "./setup/supplier/supplier.module";
import { AbstractOfCanvassModule } from "./transaction/abstract-of-canvass/abstract-of-canvass.module";
import { UnitConversionModule } from "./setup/unit-conversion/unit-conversion.module";
import { PurchaseOrderModule } from "./transaction/purchase-order/purchase-order.module";
import { InspectionAndAcceptanceReportModule } from "./transaction/inspection-and-acceptance-report/inspection-and-acceptance-report.module";
import { InventoryReportModule } from "./transaction/inventory/inventory.module";
import { BarangayModule } from "./setup/barangay/barangay.module";
import { RequisitionIssuanceSlipModule } from "./transaction/requisition-issuance-slip/requisition-issuance-slip.module";
import { PropertyTransferModule } from "./transaction/property-transfer/property-transfer.module";
import { AcknowledgementReceiptOfEquipmentModule } from "./transaction/acknowledgement-reecipt-of-equipment/acknowledgement-reecipt-of-equipment.module";
import { InventoryCustodianSlipModule } from "./transaction/inventory-custodian-slip/inventory-custodian-slip.module";
import { RequestForInspectionModule } from "./transaction/request-for-inspection/request-for-inspection.module";
import { RequestForRepairModule } from "./transaction/request-for-repair/request-for-repair.module";
import { WasteMaterialReportModule } from "./transaction/waste-material-report/waste-material-report.module";
import { PropertyRequisitionSlipModule } from "./transaction/property-requisition-slip/property-requisition-slip.module";
import { PropertyAccountabilitySlipModule } from "./transaction/property-accountability-slip/property-accountability-slip.module";
import { PropertyReturnSlipModule } from "./transaction/property-return-slip/property-return-slip.module";
import { env } from "process";
import { ClientsModule, Transport } from "@nestjs/microservices"; 
import { EmployeeModule } from './setup/employee/employee.module';
import { BarangayIssuanceModule } from './transaction/barangay-issuance/barangay-issuance.module';
import { GenBarangayModule } from "./setup/gen-barangay/gen-barangay.module";
import { AppropriationModule } from './setup/appropriation/appropriation.module';
import { InspectionAndAcceptanceReportActualModule } from './transaction/inspection-and-acceptance-report-actual/inspection-and-acceptance-report-actual.module';
import { PreRepairInspectionModule } from "./transaction/pre-repair-inspection/pre-repair-inspection.module";
import { PostRepairInspectionModule } from "./transaction/post-repair-inspection/post-repair-inspection.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:['.env']
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: env.DB_HOST || "localhost",
      port: +env.DB_PORT || 3306,
      username: env.DB_USER || "root",
      password: env.DB_PASSWORD || "1234",
      database: env.DB_NAME || "gso",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
    AuthModule,
    SwaggerModule,
    OfficeModule,
    GenBarangayModule,
    BarangayModule,
    ItemModule,
    UnitConversionModule,
    GroupModule,
    TypeModule,
    SOFModule,
    AccountBudgetModule,
    DepartmentModule,
    SupplierModule,
    FundCategoryModule,
    ProjectProposalModule,
    PurchaseRequestModule,
    RequestQuotationModule,
    AbstractOfCanvassModule,
    PurchaseOrderModule,
    InspectionAndAcceptanceReportModule,
    InventoryReportModule,
    RequisitionIssuanceSlipModule,
    PropertyTransferModule,
    AcknowledgementReceiptOfEquipmentModule,
    InventoryCustodianSlipModule,
    RequestForInspectionModule,
    RequestForRepairModule,
    WasteMaterialReportModule,
    PropertyRequisitionSlipModule,
    PropertyAccountabilitySlipModule,
    PropertyReturnSlipModule,  
    PreRepairInspectionModule,
    PostRepairInspectionModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'GENERAL_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('GENERAL_HOST'),
            port: config.get('GENERAL_PORT')
          },
        }),
      },
    ]),
    EmployeeModule,
    BarangayIssuanceModule,
    AppropriationModule,
    InspectionAndAcceptanceReportActualModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [ClientsModule]
})
export class AppModule {}
