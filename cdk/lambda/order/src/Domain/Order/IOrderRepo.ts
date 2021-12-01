// Here define interface
// Between 2 part
// 1. Actual interact with DB in Queries layer
// 2. To let each action class to call this interface
// Process: Controller -> Action class(Create/Update/Get) -> This interface -> Queries Layer
import { OrderEntity } from './OrderType';

export interface IOrderRepo {
  // create order
  Create(order: OrderEntity): Promise<OrderEntity>;

  // update order
  Update(
    orderId: string,
    userId: string,
    updateField: Partial<OrderEntity>,
  ): Promise<OrderEntity>;

  // Get 1 order
  Get(orderId: string, userId: string): Promise<OrderEntity>;

  // Get a list of order
  GetList(userId: string): Promise<OrderEntity>;

  // Check status
  CheckStatus(userId: string, orderId: string): Promise<OrderEntity>;
}
