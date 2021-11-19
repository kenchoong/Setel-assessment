import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { OrderService } from './order.service';
import { OrderController } from './orders.controller';
import { TOKEN } from './token';
import { CreateOrderDto } from './CreateOrderDto';
import { DynamoDB } from 'aws-sdk';
import * as AWSMock from 'jest-aws-sdk-mock';
import { v4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
//const { DocumentClient } = DynamoDB;

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const mockUuid = require('uuid') as { v4: jest.Mock<string, []> };

let mockDynamoDbPut = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        $response: {
          httpResponse: {
            statusCode: 200,
          },
        },
      });
    },
  };
});

let mockQuery = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        $response: {
          httpResponse: {
            statusCode: 200,
          },
        },
        Items: [
          {
            SK: 'ORDER#123',
            PK: 'USER#ABC',
            attributes: {
              productName: '1234',
            },
          },
        ],
      });
    },
  };
});

let mockGet = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        Item: {
          SK: 'ORDER#123',
          PK: 'USER#ABC',
          attributes: {
            productName: '1234',
          },
        },
      });
    },
  };
});

let mockUpdate = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        Attributes: {
          productId: '1234',
        },
      });
    },
  };
});

describe('OrdersController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: DynamoDB.DocumentClient,
          useValue: {
            put: mockDynamoDbPut,
            query: mockQuery,
            get: mockGet,
            update: mockUpdate,
          },
        },
        {
          provide: TOKEN.TABLE_NAME,
          useValue: 'LocalTestingTable',
        },
        {
          provide: TOKEN.TOPIC_ARN,
          useValue: '12345',
        },
      ],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  describe('Order suit', () => {
    it('Successfully Create Order', async () => {
      // give the request from lambda event
      const req = {
        apiGateway: {
          event: {
            headers: {
              Host: '1234',
            },
            requestContext: {
              stage: 'prod',
            },
          },
        },
      };
      // the body
      const body: CreateOrderDto = {
        userId: '1234',
        productId: '1',
        productName: 'abcd',
        totalOrderAmount: 'RM99',
        orderStatus: 'processing',
        createdAt: '12345',
      };

      // SNS is ok
      AWSMock.mock('SNS', 'publish', Promise.resolve());

      mockUuid.v4.mockImplementationOnce(() => 'abc-1234');

      // then it should be like this
      expect(await orderController.createOrder(body, req)).toStrictEqual({
        ok: true,
        created: {
          id: 'abc-1234',
        },
        payment: 'processing',
      });
    });

    it('SNS not ok', async () => {
      const req = {
        apiGateway: {
          event: {
            headers: {
              Host: '1234',
            },
            requestContext: {
              stage: 'prod',
            },
          },
        },
      };

      const body: CreateOrderDto = {
        userId: '1234',
        productId: '1',
        productName: 'abcd',
        totalOrderAmount: 'RM99',
        orderStatus: 'processing',
        createdAt: '12345',
      };

      AWSMock.mock('SNS', 'publish', Promise.reject());

      expect(await orderController.createOrder(body, req)).toStrictEqual({
        ok: false,
        message: 'cant create order',
      });
    });

    it('DynamoDB failed to insert data', async () => {
      const req = {
        apiGateway: {
          event: {
            headers: {
              Host: '1234',
            },
            requestContext: {
              stage: 'prod',
            },
          },
        },
      };
      mockDynamoDbPut = jest.fn().mockImplementation(() => {
        return {
          promise() {
            return Promise.resolve({
              $response: {
                httpResponse: {
                  statusCode: 500,
                },
              },
            });
          },
        };
      });

      const body: CreateOrderDto = {
        userId: '1234',
        productId: '1',
        productName: 'abcd',
        totalOrderAmount: 'RM99',
        orderStatus: 'processing',
        createdAt: '12345',
      };

      expect(await orderController.createOrder(body, req)).toStrictEqual({
        ok: false,
        message: 'cant create order',
      });
    });

    it('Get user order list ', async () => {
      expect(await orderController.listOrder('123')).toStrictEqual([
        {
          orderId: '123',
          userId: 'ABC',
          productName: '1234',
        },
      ]);
    });

    it('Get order details', async () => {
      expect(
        await orderController.findOrderByOrderId('123', '1234'),
      ).toStrictEqual({
        orderId: '123',
        userId: 'ABC',
        productName: '1234',
      });
    });
    /*
    it('No item found', async () => {
      mockGet.mockImplementationOnce(() => {
        return {
          promise() {
            return Promise.resolve({});
          },
        };
      });

      expect(
        await orderController.findOrderByOrderId('123', '1234'),
      ).rejects.toThrow(NotFoundException);
    }); */

    it('Update Order', async () => {
      const body: CreateOrderDto = {
        userId: '1234',
        productId: '1',
        productName: 'abcd',
        totalOrderAmount: 'RM99',
        orderStatus: 'processing',
        createdAt: '12345',
      };

      expect(
        await orderController.updateOrderStatus('123', body),
      ).toStrictEqual({
        ok: true,
        updated: {
          orderId: '123',
          productId: '1234',
        },
      });
    });
  });
});
