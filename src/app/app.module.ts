import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigModule } from '../typeorm/typeorm-config.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [TypeormConfigModule, AwsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
