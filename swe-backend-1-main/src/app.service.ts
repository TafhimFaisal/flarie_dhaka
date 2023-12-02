import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Player } from './entities/Player';
import { Reward } from './entities/Reward';
import { PlayerCoupon } from './entities/PlayerCoupon';
import { RedeemCouponDataDto } from './dto/redeem-coupon.dto';

@Injectable()
export class AppService {
  constructor (
    @InjectRepository(Player) private playerRepository:Repository<Player>,
    @InjectRepository(Reward) private rewardRepository:Repository<Reward>,
    @InjectRepository(PlayerCoupon) private redeemCouponRepository:Repository<PlayerCoupon>,
  ){}
  async getHello() {
    let player = await this.playerRepository.findOne({where:{id:1},relations:{
      coupons:{ coupon:true }
    }})
    
    return 'Hello World!';
  }
  
  async couponRedeem(couponRedeemData:RedeemCouponDataDto) {
    let record = this.redeemCouponRepository.create({
      player:couponRedeemData.player,
      coupon:couponRedeemData.coupon,
      redeemedAt:new Date()
    })
    await this.redeemCouponRepository.save(record)
    return record;
  }
  
  public getPlayer = async (id:number) => {
    let player = await this.playerRepository.findOne({where:{id:id},relations:{
      coupons:{ coupon:true }
    }})
    
    return player;
  }
  
  public getReward = async (id:number) => {
    let player = await this.rewardRepository.findOne({where:{id:id},relations:{
      coupons:true
    }})
    
    return player;
  }
}
