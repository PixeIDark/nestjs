import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(user);
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }
      throw error;
    }
  }
  private readonly ADMIN_PASSWORD = 'im79517951'; // 환경변수로 관리 추천

  async findAllUsers(adminPassword: string) {
    // 운영자 비밀번호 확인
    if (adminPassword !== this.ADMIN_PASSWORD) {
      throw new UnauthorizedException('운영자 권한이 없습니다.');
    }

    // 모든 유저 조회 (비밀번호 제외)
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...userInfo } = user;
      return userInfo;
    });
  }
}
