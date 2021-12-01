import { Module } from '@nestjs/common';

import { OrderModule } from './Order/OrderModule';

// In this domain folder, will have a lot different folder
// Each folder, is 1 model
// so Order, Payment, User, Product and so on
// All folder combined, then become this Domain Module.
@Module({
  imports: [OrderModule],
  exports: [OrderModule],
})
export class DomainModule {}
