import { TypeOrmModule } from '@nestjs/typeorm';
import { JonModule } from './jon/jon.module';
import { Module } from '@nestjs/common';
import { Jon } from 'src/jon/jon.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // MySQL 사용자 이름
      password: 'im79517951', // MySQL 비밀번호
      database: 'jon', // 데이터베이스 이름
      entities: [Jon], // 엔티티 클래스들
      synchronize: true, // 개발환경에서만 true로 설정
    }),
    JonModule,
  ],
})
export class AppModule {}
