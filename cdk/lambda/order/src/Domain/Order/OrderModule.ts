import { Module } from '@nestjs/common';
import { CreateOrder } from './CreateOrder';
import { UpdateOrder } from './UpdateOrder';
import { GetOrder } from './GetOrder';
import { GetOrderList } from './GetOrderList';
import { OrderRepositoryModule } from '../../Queries/Order/OrderRepoModule';

// Gel up all the stuff, make it as 1 module
@Module({
  imports: [OrderRepositoryModule],
  providers: [CreateOrder, UpdateOrder, GetOrder, GetOrderList],
  exports: [CreateOrder, UpdateOrder, GetOrder, GetOrderList],
})
export class OrderModule {}
