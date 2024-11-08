import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateJonDto } from 'src/jon/create-jon.dto';
import { Jon } from 'src/jon/jon.entity';
import { JonService } from 'src/jon/jon.service';

@Controller('jon')
export class JonController {
  // @Get()
  // start(@Req() request: Request): string {
  //   const userAgent = request.headers;

  //   const name = request.query.name;

  //   return `Hello ${name}, you're using ${userAgent['user-agent']}`;
  // }
  //  curl "http://localhost:3000/jon/123?name=dark&age=10&job=qt" <= get이라 안적어줘도됨
  // @Get(':id') // URL 파라미터 지정 @Get(':id/profile')
  // start(
  //   @Param('id') id: number,
  //   @Query('name') name: string,
  //   @Query('age') age: number,
  //   @Query('job') wjswlr: string,
  // ): string {
  //   return `${id}'s status {name: ${name} age: ${age} job: ${wjswlr}}`;
  // }

  // curl "http://localhost:3000/jon/ab_fsacd"H^C
  // @Get('ab*cd') // <= *에 뭐든 다 글자수도 상관없이 들어가도 잘 실행됨.
  // findAll() {
  //   return 'This route uses a wildcard';
  // }

  constructor(private readonly jonService: JonService) {}

  @Get()
  async findAll(): Promise<Jon[]> {
    return await this.jonService.findAll();
  }

  //curl -X POST http://localhost:3000/jon
  @Post()
  async create(@Body() createJonDto: CreateJonDto): Promise<Jon> {
    let { breed, ...rest } = createJonDto;
    if (breed === 'black') breed = 'nigro';

    const jonData = { ...rest, breed };
    return await this.jonService.create(jonData);
  }
}
