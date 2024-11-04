import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jons')
export class Jon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
