import {
  Controller,
  Inject,
  Post,
  Param,
  Get,
  Body,
  NotFoundException,
  Put,
  Request,
} from '@nestjs/common';
import { TOKEN } from './token';
import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';
import { sanitizeIdsForClient } from './utils';
import { CreateOrderDto, UpdateOrderDto } from './CreateOrderDto';
import { OrderService } from './order.service';
import * as lambda from 'aws-lambda';

/*
let dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});*/

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(TOKEN.TABLE_NAME) private tableName: string,
    private dc: DynamoDB.DocumentClient,
    private orderService: OrderService,
  ) {}

  // Create a new Order
  @Post()
  async createOrder(@Body() body: CreateOrderDto, @Request() req) {
    /*
    let dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });*/

    const orderId = v4();
    const order = await this.dc
      .put({
        TableName: this.tableName,
        Item: {
          PK: `USER#${body.userId}`,
          SK: `ORDER#${orderId}`,
          attributes: body,
        },
      })
      .promise();

    if (order.$response.httpResponse.statusCode === 200) {
      // Trigger the payment service to process the order
      const url =
        'https://' +
        req.apiGateway.event.headers.Host +
        '/' +
        req.apiGateway.event.requestContext.stage;
      this.orderService
        .processPayment(orderId, body.userId, Number(body.productId), url)
        .subscribe((res) => console.log(res));

      return {
        ok: true,
        created: {
          id: orderId,
        },
        payment: 'processing',
      };
    } else {
      return {
        ok: false,
        message: 'cant create order',
      };
    }
  }

  // Endpoint to let client long polling to check the status
  @Get('/status/:orderId/:userId')
  async checkStatus(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {
    /*
    let dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });*/
    const theOrder = await this.dc
      .get({
        TableName: this.tableName,
        Key: {
          PK: `USER#${userId}`,
          SK: `ORDER#${orderId}`,
        },
      })
      .promise();

    const singleItem = theOrder.Item;

    if (!singleItem) {
      throw new NotFoundException();
    }

    return {
      ok: true,
      orderStatus: singleItem.attributes.orderStatus,
    };
  }

  // fetch all order of the user
  @Get(':userId')
  async listOrder(@Param('userId') userId: string) {
    /*
    let dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });*/

    const orderResponse = await this.dc
      .query({
        TableName: this.tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
          ':sk': `ORDER#`,
        },
      })
      .promise();

    return orderResponse.Items.map((order) => ({
      // do the thing
      orderId: sanitizeIdsForClient(order.SK, 'ORDER#'),
      userId: sanitizeIdsForClient(order.PK, 'USER#'),
      ...order.attributes,
    }));
  }

  // FETCH Order details using the OrderId
  @Get('/:userId/:orderId')
  async findOrderByOrderId(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {
    /*
    let dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });*/

    const singleOrderResponse = await this.dc
      .get({
        TableName: this.tableName,
        Key: {
          PK: `USER#${userId}`,
          SK: `ORDER#${orderId}`,
        },
      })
      .promise();

    const singleOrder = singleOrderResponse.Item;

    if (!singleOrder) {
      throw new NotFoundException();
    }

    return {
      orderId: sanitizeIdsForClient(singleOrder.SK, 'ORDER#'),
      userId: sanitizeIdsForClient(singleOrder.PK, 'USER#'),
      ...singleOrder.attributes,
    };
  }

  // Update Order status
  @Put(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    /*
    let dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });*/

    const updateOrderResponse = await this.dc
      .update({
        TableName: this.tableName,
        Key: {
          PK: `USER#${body.userId}`,
          SK: `ORDER#${orderId}`,
        },
        UpdateExpression: 'SET attributes.orderStatus = :newStatus',
        ExpressionAttributeValues: {
          ':newStatus': body.orderStatus,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();

    const updatedOrder = updateOrderResponse.Attributes;
    return {
      ok: true,
      updated: { orderId: orderId, ...updatedOrder },
    };
  }
}
