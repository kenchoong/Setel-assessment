// here define the get action
import { Injectable, Inject } from '@nestjs/common';
import { OrderEntity } from './OrderType';
import { IOrderRepo } from './IOrderRepo';

// here inject the OrderRepo in here
const OrderRepo = () => Inject('IOrderRepo');

@Injectable()
export class GetOrder {
  constructor(@OrderRepo() private readonly orderRepo: IOrderRepo) {}

  public async Get(userId: string, orderId: string): Promise<void> {
    await this.orderRepo.Get(userId, orderId);
  }
}
