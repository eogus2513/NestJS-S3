import { Controller, Post, Request, UseInterceptors } from '@nestjs/common';
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

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'private',
        key: function (request, file, callback) {
          callback(null, `${Date.now().toString()}_${file.originalname}`);
        },
      }),
      limits: {},
    }),
  )
  async uploadImage(@Request() request) {
    return this.imageService.uploadFile(request.files);
  }
}
