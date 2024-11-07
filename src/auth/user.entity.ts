import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@test.com', description: '이메일' })
  @Column({ unique: true, length: 45 })
  email: string;

  @ApiProperty({ example: '홍길동', description: '이름' })
  @Column({ length: 20 })
  name: string;

  @ApiProperty({
    example: '2024-11-07T12:00:00',
    description: '계정 생성일',
  })
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // password는 @ApiProperty 제외 (문서에 노출되지 않음)
  @Column({ length: 100 })
  password: string;
}
