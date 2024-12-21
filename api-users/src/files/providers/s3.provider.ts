import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { envs } from 'src/config';
import { UploadFileDto } from '../dtos/upload-file.dto';

@Injectable()
export class S3Provider {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: envs.awsAccessKeyId,
      secretAccessKey: envs.awsSecretAccessKey,
    });
  }

  async uploadFile(body: UploadFileDto) {
    const { fileName, file } = body;
    const decodedFile = Buffer.from(file, 'base64');

    const params = {
      Bucket: envs.awsBucketName,
      Key: `files/${fileName}`,
      ACL: 'public-read',
      Body: decodedFile,
    };

    try {
      const responseS3 = await this.s3.upload(params).promise();
      return responseS3;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
