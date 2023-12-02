import { Coupon } from "./../entities/Coupon"
import { Player } from "./../entities/Player"
import { Reward } from "./../entities/Reward"

export class RedeemCouponDataDto {
    player : Player
    reward : Reward
    coupon : Coupon
}
