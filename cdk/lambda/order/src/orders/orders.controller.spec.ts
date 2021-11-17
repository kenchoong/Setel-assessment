import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { OrderController } from './orders.controller';

const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);

describe('OrdersController', () => {
  let appController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    appController = app.get<OrderController>(OrderController);
  });

  describe('Order suit', () => {
    it('should insert item into table', async () => {
      await ddb
        .put({ TableName: 'files', Item: { id: '1', hello: 'world' } })
        .promise();

      const { Item } = await ddb
        .get({ TableName: 'files', Key: { id: '1' } })
        .promise();

      expect(Item).toEqual({
        id: '1',
        hello: 'world',
      });
    });
  });
});
