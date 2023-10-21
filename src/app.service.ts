import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';

@Injectable()
export class AppService {
  private readonly ec2: AWS.EC2;

  constructor() { this.ec2 = new AWS.EC2();  }
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
    const response = await this.ec2.describeInstances().promise();
    const instanceId = response.Reservations?.[0]?.Instances?.[0]?.InstanceId;
    if (instanceId) {
      return instanceId;
    } else {
      throw new Error('Failed to retrieve instance ID');
    }
  }
}
