import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { FilesInterceptor } from '@nestjs/platform-express';
import 'dotenv/config';

const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  public async getAllImage() {
    return await this.imageService.getAllImage();
  }

  @Get('/:id')
  public async getImage(@Param('id') param) {
    return await this.imageService.getImage(param);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'private',
        key: function (request, image, callback) {
          callback(null, `${Date.now().toString()}_${image.originalname}`);
        },
      }),
      limits: {},
    }),
  )
  async uploadImage(@Request() request) {
    return this.imageService.uploadFile(request.files);
  }
}
