import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';

@Injectable()
export class FileUploadService {
  constructor(private readonly fileUploadRepository: FileUploadRepository) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const response = this.fileUploadRepository.uploadImage(file);
  }
}
