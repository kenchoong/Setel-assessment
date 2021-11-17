import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World 1234!';
  }
}
