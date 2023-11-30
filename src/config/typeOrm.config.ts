import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigService,ConfigModule } from "@nestjs/config/dist";

export let typeOrmConfig:TypeOrmModuleAsyncOptions ={
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('TYPEORM_HOST'),
    port: +configService.get('TYPEORM_PORT'),
    username: configService.get('TYPEORM_USERNAME'),
    password: configService.get('TYPEORM_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE'),
    entities: [__dirname+"./../**/entities/*.entity{.ts,.js}"],
    subscribers:[__dirname+"./../**/*.subscriber{.ts,.js}"],
    synchronize: true,
  }),
  inject: [ConfigService],
}