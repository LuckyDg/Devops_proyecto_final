import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dtos/upload-file.dto';
import { S3Provider } from './providers/s3.provider';

@Injectable()
export class FilesService {
  constructor(private readonly s3Provider: S3Provider) {}

//   async uploadFile(body: UploadFileDto) {
//     return await this.s3Provider.uploadFile(body);
//   }
}
