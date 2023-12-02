import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeOrm.config';
import { Player } from './entities/Player';
import { Coupon } from './entities/Coupon';
import { PlayerCoupon } from './entities/PlayerCoupon';
import { Reward } from './entities/Reward';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      envFilePath:['.env'],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([Player,Coupon,PlayerCoupon,Reward]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
