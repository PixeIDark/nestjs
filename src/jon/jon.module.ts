import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JonController } from './jon.controller';
import { JonService } from './jon.service';
import { Jon } from 'src/jon/jon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jon])],
  controllers: [JonController],
  providers: [JonService],
})
export class JonModule {}
