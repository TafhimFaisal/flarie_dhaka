import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { AppService } from './../app.service';
import { Coupon } from './../entities/Coupon';
import { PlayerCoupon } from './../entities/PlayerCoupon';

@Injectable()
export class RedeemCouponValidationPipe implements PipeTransform {
  private db_check_method = {}
  constructor (
    private readonly appService:AppService
    ) {
      this.db_check_method['playerId'] = appService.getPlayer
      this.db_check_method['rewardId'] = appService.getReward
    }

  getCurrentWeekDates() {
    const current_date = new Date(),
          current_day = current_date.getDay(),
          start_date = new Date(current_date),
          end_date = new Date(current_date),
          week_dates = []

    start_date.setDate(current_date.getDate() - current_day)
    end_date.setDate(current_date.getDate() + (6 - current_day))
  
    let current_date_pointer = new Date(start_date)
    while (current_date_pointer <= end_date) {
      let date = new Date(current_date_pointer)
      week_dates.push(date)
      current_date_pointer.setDate(current_date_pointer.getDate() + 1)
    }
  
    return week_dates
  }

  isDateEqual(firstDate:Date,secondDate:Date){
   
    return (
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate()
    )
  }

  async exist(value:any){
    return new Promise( async (resolve,reject) => {
      let required_field_list = ['playerId','rewardId'],
          fatched_data = {}
          
      for(let field of required_field_list){

        if(!value[field]) reject(`${field} is required`)
        let data = await this.db_check_method[field](value[field])
        if(!data) reject(`invalide ${field}`)
        fatched_data[field] = data
        
      }
      resolve(fatched_data)
    })
  }
  
  async couponCheck(data:any){
    return new Promise( async (resolve,reject) => {

      let current_date = new Date(),
          current_week_date = this.getCurrentWeekDates(),
          current_date_redeemtion = [],
          current_week_redeemtion = [],
          daily_limit = data.rewardId.totalLimit,
          weekly_limit = daily_limit*7 

      if(current_date > data.rewardId.endDate) reject('reward expired')
      for(let redeemed_coupon of data.playerId.coupons ){
        if(this.isDateEqual(current_date,redeemed_coupon.redeemedAt)) current_date_redeemtion.push(redeemed_coupon.coupon)
        for(let week_date of current_week_date){
          if(this.isDateEqual(week_date,redeemed_coupon.redeemedAt)) current_week_redeemtion.push(redeemed_coupon.coupon)
        }  
      }
      if(current_date_redeemtion.length >= daily_limit) reject('you have reaced your daily limit')
      if(current_week_redeemtion.length >= weekly_limit) reject('you have reaced your weekly limit')

      
      let unredeemed_coupons = data.rewardId.coupons.filter((reward_coupon:Coupon)=> {
        let redeemed = data.playerId.coupons.some( (redeemed_coupon:PlayerCoupon) => redeemed_coupon.coupon ? reward_coupon.id == redeemed_coupon.coupon.id : false )
        if(!redeemed) return reward_coupon
      })
      
      if(unredeemed_coupons.length == 0)
        reject(`you have redeemed all coupon for this reward`)

      resolve({
        player:data.playerId,
        reward:data.rewardId,
        coupon: unredeemed_coupons[0]
      })
      
    })
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    await this.exist(value).catch((errors)=>{
      throw new HttpException(errors,HttpStatus.BAD_REQUEST)
    }).then( async (data)=>{
      await this.couponCheck(data).catch((error)=>{
        throw new HttpException(error,HttpStatus.BAD_REQUEST)
      }).then((data)=>{
        value = data
      })
    })

    return value
  }
}
