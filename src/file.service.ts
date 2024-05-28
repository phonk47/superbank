import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class FileService {
  constructor(private userService: UserService) {}

  private readonly logger = new Logger(FileService.name);

  async uploadClientFile(file: Express.Multer.File) {
    const data = this.readCsvFile(file);

    for (const line of data) {
      const firstName = line[0];
      const email = line[1];
      const password = line[2];
      try {
        await this.userService.createUser({ firstName, email, password });
      } catch (error) {
        console.log('Error creating user', { firstName, email, password });
        console.log(error);
      }
    }
  }

  readCsvFile(file: Express.Multer.File): string[][] {
    const lines = file.buffer.toString().split('\n');
    const data = lines.slice(1); // remove headers

    return data.map((el) => el.split(','));
  }
}
