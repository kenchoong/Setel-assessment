import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { PaymentResultDto } from './CreateOrderDto';

@Injectable()
export class OrderService {
  constructor(private httpService: HttpService) {}

  processPayment(
    orderId: string,
    userId: string,
    productId: number,
    url: string,
  ): Observable<PaymentResultDto> {
    //const hostUrl = 'http://localhost:3002/payment';
    const hostUrl = url + '/payment';
    const payload = {
      orderId: orderId,
      userId: userId,
      productId: productId,
    };

    return this.httpService
      .post(hostUrl, payload)
      .pipe(map((response) => response.data));
  }
}
