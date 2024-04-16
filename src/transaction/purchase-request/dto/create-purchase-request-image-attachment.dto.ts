import { ApiProperty } from "@nestjs/swagger"

export class CreatePurchseRequestImageAttachment {
  @ApiProperty()
  seqNo: string
  @ApiProperty()
  imgUrl: string
  @ApiProperty()
  imgDescription: string
  @ApiProperty()
  imgRemarks: string
}
