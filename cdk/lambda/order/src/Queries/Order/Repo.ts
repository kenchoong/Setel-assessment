import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { IOrderRepo } from 'src/Domain/Order/IOrderRepo';
import { OrderEntity } from 'src/Domain/Order/OrderType';
import { IOrderEntity, IOrderKey } from './OrderEntity';

/*
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderSchema } from './OrderEntity';
*/

// HERE having problem with Dynamodb single table design
@Injectable()
export class OrderRepo implements IOrderRepo {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<IOrderEntity, IOrderKey>,
  ) {}
  CheckStatus(userId: string, orderId: string): Promise<OrderEntity> {
    throw new Error('Method not implemented.');
  }

  // Here actually interact with the database
  public async Create(order: OrderEntity): Promise<OrderEntity> {
    return this.orderModel.create();
  }

  // update in DB
  public Update(
    orderId: string,
    userId: string,
    updateField: Partial<OrderEntity>,
  ): Promise<OrderEntity> {
    return this.orderModel.update();
  }

  // get an order in DB
  public Get(orderId: string): Promise<OrderEntity> {
    return this.orderModel.get();
  }

  // get a list in DB
  public GetList(userId: string): Promise<OrderEntity> {
    return this.orderModel.query();
  }
}
