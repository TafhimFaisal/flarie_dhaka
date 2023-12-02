import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coupon } from './Coupon';
import { PlayerCoupon } from './PlayerCoupon';
@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type=> PlayerCoupon,(player_coupon)=> player_coupon.player)
  coupons: PlayerCoupon[]

}
