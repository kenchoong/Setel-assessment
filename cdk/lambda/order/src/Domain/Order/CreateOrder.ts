import { Injectable, Inject } from '@nestjs/common';
import { OrderEntity } from './OrderType';
import { IOrderRepo } from './IOrderRepo';

// here inject the OrderRepo in here
const OrderRepo = () => Inject('IOrderRepo');

@Injectable()
export class CreateOrder {
  constructor(@OrderRepo() private readonly orderRepo: IOrderRepo) {}

  public async Create(toCreate: OrderEntity): Promise<void> {
    await this.orderRepo.Create(toCreate);
  }
}
