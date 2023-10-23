import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) { }

  getTimeString() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}-${minutes}-${seconds}`;
  }

  async createFile(fileName: string, destinationPath: string, data: any) {
    const filePath = `${destinationPath}/${fileName}`;

    await fs.promises.writeFile(filePath, data);

    return filePath;
  }

  async copyFile(sourcePath: string, destinationPath: string) {
    await fs.promises.copyFile(sourcePath, destinationPath);
  }

  async getInstanceId(): Promise<string> {
    const url = 'http://169.254.169.254/latest/meta-data/instance-id'
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log(data);
    return data;
  }
}
