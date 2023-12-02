import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coupon } from './Coupon';
@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  perDayLimit: number;

  @Column()
  totalLimit: number;

  @OneToMany(type => Coupon,(coupon)=> coupon.Reward)
  coupons:Coupon[]
}
