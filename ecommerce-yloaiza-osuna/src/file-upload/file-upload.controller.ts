import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cargar una imagen a Cloudinary y añadirla al producto',
  })
  @ApiParam({ name: 'id', description: 'ID del producto a modificar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', //* 010101010101010101010101010...0101010
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'La imagen fue cargada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Falló la carga del archivo',
  })
  @Post('uploadImage/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 200_000 },
    }),
  )
  async uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'Supera el peso máximo de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.png|.svg|.webp|.jpeg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.fileUploadService.uploadImage(file, productId);
  }
}
