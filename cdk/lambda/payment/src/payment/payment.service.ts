import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(private httpService: HttpService) {}

  updateOrderStatus(
    orderId: string,
    userId: string,
    status: string,
    url: string,
  ): Observable<any> {
    const hostUrl = url + '/orders/' + orderId;
    const payload = {
      orderStatus: status,
      userId: userId,
    };

    return this.httpService.put(hostUrl, payload);
  }
}
