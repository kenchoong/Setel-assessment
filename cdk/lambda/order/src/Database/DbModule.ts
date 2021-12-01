import { Module } from '@nestjs/common';
import { DatabaseConnectionService } from './DbConnectionService';

@Module({
  providers: [DatabaseConnectionService],
  exports: [DatabaseConnectionService],
})
export class DatabaseModule {}
