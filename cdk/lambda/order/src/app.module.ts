import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderService } from './orders/order.service';
import { OrderController } from './orders/orders.controller';
import { DynamoDB } from 'aws-sdk';
import { TOKEN } from './orders/token';

/*
const client = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: process.env.DYNAMODB_ENDPOINT,
});*/

@Module({
  imports: [HttpModule],
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
