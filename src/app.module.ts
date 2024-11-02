import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JonController } from './jon/jon.controller';

@Module({
  imports: [],
  controllers: [AppController, JonController],
  providers: [AppService],
})
export class AppModule {}
