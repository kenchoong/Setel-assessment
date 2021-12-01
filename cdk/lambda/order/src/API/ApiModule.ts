import { Module } from '@nestjs/common';
import { OrderController } from './Order/OrderController';
import { DomainModule } from '../Domain/DomainModule';

// In this API folder, can have a lot of folder
// Each folder is 1 endpoint
// It contain, all the Data Transfer object needed
// Then we gel it up here
@Module({
  controllers: [OrderController],
  imports: [DomainModule],
})
export class ApiModule {}
