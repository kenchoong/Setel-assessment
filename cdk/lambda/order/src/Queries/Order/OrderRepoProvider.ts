// this class is make a provider, to be used inside Module
// so is

import { Provider } from '@nestjs/common';
import { OrderRepo } from './Repo';

export const OrderRepoProvider: Provider = {
  provide: 'OrderRepo',
  useClass: OrderRepo,
};
