// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) // User 정보를 가져오기 위해 추가
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // 환경변수로 관리 추천 이새끼 뭐지?
    });
  }

  async validate(payload: any) {
    // DB에서 사용자 전체 정보를 조회
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    // password를 제외한 모든 정보 반환
    const { password, ...result } = user;
    return result;
  }
}
