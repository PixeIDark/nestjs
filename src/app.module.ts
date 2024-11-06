import { TypeOrmModule } from '@nestjs/typeorm';
import { JonModule } from './jon/jon.module';
import { Module } from '@nestjs/common';
import { Jon } from 'src/jon/jon.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // MySQL 사용자 이름
      password: 'im79517951', // MySQL 비밀번호
      database: 'jon', // 데이터베이스 이름
      entities: [Jon, User], // 엔티티 클래스들
      synchronize: false, // db 테이블 구조를 mySQL설정 기준으로 해줌 false가 true면 nest 엔티티 기준
    }),
    JonModule,
    AuthModule,
  ],
})
export class AppModule {}
