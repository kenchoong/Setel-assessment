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
  Response,
  Res,
} from '@nestjs/common';
import { TOKEN } from './token';
import { DynamoDB, SNS } from 'aws-sdk';
import { v4 } from 'uuid';
import { sanitizeIdsForClient } from '../../orders/utils';
import { CreateOrderDto } from './CreateOrderDto';
import { UpdateOrderDto } from './UpdateOrderDto';
import { OrderService } from '../../orders/order.service';
import { lastValueFrom } from 'rxjs';
import { CreateOrder } from 'src/Domain/Order/CreateOrder';
import { UpdateOrder } from 'src/Domain/Order/UpdateOrder';
import { GetOrder } from 'src/Domain/Order/GetOrder';
import { GetOrderList } from 'src/Domain/Order/GetOrderList';
import { CheckOrderStatus } from 'src/Domain/Order/CheckOrderStatus';

/*
  let dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });*/

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(TOKEN.TABLE_NAME) private tableName: string,
    @Inject(TOKEN.TOPIC_ARN) private topicArn: string,
    private dc: DynamoDB.DocumentClient,
    private orderService: OrderService,

    private createOrder1: CreateOrder,
    private updateOrder: UpdateOrder,
    private getAllOrder: GetOrderList,
    private getOneOrder: GetOrder,
    private checkOrderStatus: CheckOrderStatus,
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

      const payload = {
        url: url,
        productId: body.productId,
        orderId: orderId,
        userId: body.userId,
      };

      let published = new SNS({ apiVersion: '2010-03-31' })
        .publish({
          Message: JSON.stringify(payload),
          TopicArn: this.topicArn,
        })
        .promise();

      return published
        .then((res) => {
          console.log(res);
          return {
            ok: true,
            created: {
              id: orderId,
            },
            payment: 'processing',
          };
        })
        .catch((err) => {
          return {
            ok: false,
            message: 'cant create order',
          };
        });
    } else {
      return {
        ok: false,
        message: 'cant create order 1',
      };
    }
  }

  // Endpoint to let client long polling to check the status
  @Get('/status/:orderId/:userId')
  async checkStatus(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {
    const res = await this.checkOrderStatus.Check(userId, orderId);

    return {
      //TODO:  here should return this
    };
  }

  // fetch all order of the user
  @Get(':userId')
  async listOrder(@Param('userId') userId: string) {
    const res = await this.getAllOrder.Get(userId);

    return {
      //TODO:  here should return this
    };
  }

  // FETCH Order details using the OrderId
  @Get('/:userId/:orderId')
  async findOrderByOrderId(
    @Param('orderId') orderId: string,
    @Param('userId') userId: string,
  ) {
    const res = await this.getOneOrder.Get(userId, orderId);

    return {
      //TODO:  here should return this
    };
  }

  // Update Order status
  @Put(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    const res = await this.updateOrder.Update(orderId, body.userId, body);

    return {
      //TODO:  here should return this
      ok: true,
    };
  }
}
