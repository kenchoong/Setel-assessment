import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderService } from './orders/order.service';
import { OrderController } from './orders/orders.controller';
import { DynamoDB } from 'aws-sdk';
import { TOKEN } from './orders/token';

import { DynamooseModule } from 'nestjs-dynamoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './API/ApiModule';
import { DomainModule } from './Domain/DomainModule';
import { QueriesModel } from './Queries/QueriesModel';
import { DatabaseModule } from './Database/DbModule';

/*
const client = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: process.env.DYNAMODB_ENDPOINT,
});*/

@Module({
  imports: [
    HttpModule,
    DynamooseModule.forRootAsync({
      // here defined all the thing in
      /* TODO: Database stuff here
    aws?: {
      accessKeyId?: string;
      secretAccessKey?: string;
      region?: string;
    };
    local?: boolean | string;
    model?: ModelOptionsOptional;
    logger?: boolean | LoggerService;
    */
    }),
    ApiModule,
    QueriesModel,
    DomainModule,
  ],

  // TODO: Remove all this, if really use my solution, just put here for now.
  controllers: [AppController, OrderController],
  providers: [
    AppService,
    OrderService,
    DynamoDB.DocumentClient,
    {
      provide: TOKEN.TABLE_NAME,
      useValue: process.env.tableName,
    },
    {
      provide: TOKEN.TOPIC_ARN,
      useValue: process.env.topicArn,
    },
  ],
})
export class AppModule {}
