import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from '../image/image.module';
import { TypeormConfigModule } from '../typeorm/typeorm-config.module';

@Module({
  imports: [ImageModule, TypeormConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}