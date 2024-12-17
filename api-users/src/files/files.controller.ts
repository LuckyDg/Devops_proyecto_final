import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import { UploadFileDto } from './dtos/upload-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  async uploadFile(@Body() body: UploadFileDto, @Res() res: Response) {
    try {
      const file = await this.filesService.uploadFile(body);
      res.status(HttpStatus.OK).send(file);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
