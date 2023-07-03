import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import {
  ParseDataToIntPipe,
  TaskStatusValidationPipe,
} from './pipes/parse-data-pipe';

export enum TaskStatus {
  OPEN = 'OPEN',
  INPROGRESS = 'INPROGRESS',
  RESOLVED = 'RESOLVED',
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get<string>('jwt.secret'));
    return this.appService.getHello();
  }

  @Get(':id')
  getId(
    @Param('id', new DefaultValuePipe(10), ParseIntPipe) id: number,
  ): number {
    return id + 10;
  }

  @Get('/status/:status')
  getStatus(@Param('status', TaskStatusValidationPipe) status: string): object {
    return {
      status,
    };
  }
}
