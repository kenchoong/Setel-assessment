import { Injectable, Inject } from '@nestjs/common';
import { OrderEntity } from './OrderType';
import { IOrderRepo } from './IOrderRepo';

// here inject the OrderRepo in here
const OrderRepo = () => Inject('IOrderRepo');

@Injectable()
export class CheckOrderStatus {
  constructor(@OrderRepo() private readonly orderRepo: IOrderRepo) {}

  public async Check(userId: string, orderId: string): Promise<void> {
    await this.orderRepo.CheckStatus(userId, orderId);
  }
}
