import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn({
    type: 'timestamp', // DATE 대신 TIMESTAMP 사용
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
