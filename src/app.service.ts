import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getTimeString() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hours}-${minutes}-${seconds}`;
  }

  async createFile(fileName: string, destinationPath: string) {
    const filePath = `${destinationPath}/${fileName}`;

    await fs.promises.writeFile(filePath, '');

    return filePath;
  }

  async copyFile(sourcePath: string, destinationPath: string) {
    await fs.promises.copyFile(sourcePath, destinationPath);
  }
}
