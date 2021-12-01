import { Injectable, Inject } from '@nestjs/common';
import { OrderEntity } from './OrderType';
import { IOrderRepo } from './IOrderRepo';

// here inject the OrderRepo in here
const OrderRepo = () => Inject('IOrderRepo');

@Injectable()
export class UpdateOrder {
  constructor(@OrderRepo() private readonly orderRepo: IOrderRepo) {}

  public async Update(
    orderId: string,
    userId: string,
    toUpdate: Partial<OrderEntity>,
  ): Promise<void> {
    await this.orderRepo.Update(orderId, userId, toUpdate);
  }
}
