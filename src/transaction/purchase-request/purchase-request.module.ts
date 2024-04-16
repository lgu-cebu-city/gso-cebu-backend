import { Module } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestController } from './purchase-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRequest } from './entities/purchase-request.entity';
import { PurchaseRequestItemDetails } from './entities/purchase-request-item-details.entity';
import { PurchaseRequestSOFList } from './entities/purchase-request-sof-list.entity';
import { PurchaseRequestLogs } from './entities/purchase-request-logs.entity';
import { PurchaseRequestLogsItemDetails } from './entities/purchase-request-logs-item-details.entity';
import { PurchaseRequestLogsSOFList } from './entities/purchase-request-logs-sof-list.entity';
import { PurchaseRequestView } from './entities/purchase-request.view.entity';
import { PurchaseRequestImageAttachment } from './entities/purchase-request-image-attachment.entity';
import { PurchaseRequestLogsImageAttachment } from './entities/purchase-request-logs-image-attachment.entity';
import { PurchaseRequestIssuanceItemsView } from './entities/purchase-request-issuance-items.view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRequest, PurchaseRequestView, PurchaseRequestItemDetails, PurchaseRequestSOFList, PurchaseRequestImageAttachment, PurchaseRequestLogs, PurchaseRequestLogsItemDetails, PurchaseRequestLogsSOFList, PurchaseRequestLogsImageAttachment, PurchaseRequestIssuanceItemsView])],
  controllers: [PurchaseRequestController],
  providers: [PurchaseRequestService],
  exports: [PurchaseRequestService]
})
export class PurchaseRequestModule { }
