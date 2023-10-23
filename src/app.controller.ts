import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello(){
    return { "message":"Website is up and running" };
  }

  @Post('/dump')
  async dump(){
    const instanceID = await this.appService.getInstanceId();

    const fileName = this.appService.getTimeString() + instanceID + '.txt';

    const data = fileName + instanceID;

    const filePath = await this.appService.createFile(fileName, '/mountfolder', data);

    return { filePath };
  }
}
