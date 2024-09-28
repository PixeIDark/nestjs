import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstController } from './first/first.controller';
import { MountModule } from './mount/mount.module';

@Module({
  imports: [MountModule],
  controllers: [AppController, FirstController],
  providers: [AppService],
})
export class AppModule {}
