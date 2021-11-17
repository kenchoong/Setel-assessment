import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  let appController: PaymentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      //providers: [AppService],
    }).compile();

    appController = app.get<PaymentController>(PaymentController);
  });

  describe('Order suit', () => {});
});
