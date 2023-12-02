import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RedeemCouponValidationPipe } from './pipe/redeem-coupon-validation.pipe';
import { RedeemCouponDataDto } from './dto/redeem-coupon.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
  
  @Post('/coupon-redeem')
  async getCoupons(@Body(RedeemCouponValidationPipe) request:RedeemCouponDataDto) {
    return await this.appService.couponRedeem(request);
  }
}
