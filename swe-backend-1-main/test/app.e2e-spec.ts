import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource, getConnection } from 'typeorm';
import { PlayerCoupon } from './../src/entities/PlayerCoupon';
import { Player } from './../src/entities/Player';
import { Coupon } from './../src/entities/Coupon';
import { Reward } from './../src/entities/Reward';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let playerId:number = 1;
  let rewardId:number = 1;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('it should return success message (POST)', () => {
    return request(app.getHttpServer()).post('/coupon-redeem')
          .send({
            "playerId" : playerId,
            "rewardId" : rewardId
          }).expect(201)
  });
  
  it('it should return error message (POST)', () => {
    return request(app.getHttpServer()).post('/coupon-redeem')
          .send({
            "playerId" : playerId
          }).expect(400)
          .expect({
            "statusCode": 400,
            "message": "rewardId is required"
          })
  });
  
  it('it should return error message (POST)', () => {
    return request(app.getHttpServer()).post('/coupon-redeem')
          .send({
            "rewardId" : rewardId
          }).expect(400)
          .expect({
            "statusCode": 400,
            "message": "playerId is required"
          })
  });

});
