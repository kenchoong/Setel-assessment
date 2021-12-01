import { Module } from '@nestjs/common';

import { OrderRepositoryModule } from './Order/OrderRepoModule';

// For this lambda is only for Order, so just import 1

@Module({
  imports: [OrderRepositoryModule],
  exports: [OrderRepositoryModule],
})
export class QueriesModel {}
