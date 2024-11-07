import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    return this.authService.login(user);
  }

  @ApiOperation({ summary: '프로필 조회' })
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
    type: User,
  })
  @ApiOperation({ summary: '전체 사용자 조회 (관리자용)' })
  @ApiResponse({ status: 200, description: '조회 성공', type: [User] })
  @Post('admin/users')
  async getAllUsers(@Body() body: { adminPassword: string }) {
    return this.authService.findAllUsers(body.adminPassword);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
