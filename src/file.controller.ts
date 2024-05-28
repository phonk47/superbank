import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('api/v1')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/clients')
  @UseInterceptors(FileInterceptor('file'))
  async uploadClientsFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    await this.fileService.uploadClientFile(file);

    return new Promise<string>((resolve, reject) => {
      resolve('File uploaded successfully');
    });
  }


}
