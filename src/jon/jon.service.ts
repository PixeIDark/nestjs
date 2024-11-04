import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJonDto } from 'src/jon/create-jon.dto';
import { Jon } from 'src/jon/jon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JonService {
  constructor(
    @InjectRepository(Jon)
    private jonRepository: Repository<Jon>,
  ) {}

  async findAll(): Promise<Jon[]> {
    return await this.jonRepository.find();
  }

  async create(createJonDto: CreateJonDto): Promise<Jon> {
    const jon = this.jonRepository.create(createJonDto);
    return await this.jonRepository.save(jon);
  }
}
