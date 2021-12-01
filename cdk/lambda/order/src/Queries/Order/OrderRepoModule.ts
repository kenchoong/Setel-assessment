import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema } from './OrderEntity';
import { OrderRepoProvider } from './OrderRepoProvider';
import { DynamooseModule } from 'nestjs-dynamoose';

//TypeOrmModule.forFeature([OrderSchema])

// here need schema
@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [OrderRepoProvider],
  exports: [OrderRepoProvider],
})
export class OrderRepositoryModule {}
