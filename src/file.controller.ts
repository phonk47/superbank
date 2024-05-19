import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UserService } from './user.service';

@Controller("api/v1")
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UserService
    ) {}

//   @Get()
//   getHello(): string {
//     return this.fileService.getHello();
//   }

  // @Get(":id")
  // getFile(@Param() id: string) {
  //   return this.fileService.getFile(id);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<String> {
    // console.log(file.buffer.toString());
    const lines = file.buffer.toString().split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1);

    for (const line of data) {
      const fields = line.split(',');
      let firstName = fields[0];
      let email = fields[1];
      let password = fields[2];
      try {
        await this.userService.createUser({firstName, email, password})
      } catch (error) {
        console.log("Error creating user", {firstName, email, password});
        console.log(error);
      }

    }

    return new Promise<String>((resolve, reject) => {
      resolve("File uploaded successfully");
    });
  }
}
