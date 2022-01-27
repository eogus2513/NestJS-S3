import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PromiseResult } from 'aws-sdk/lib/request';
import * as AWS from 'aws-sdk';

@Controller('image')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Get()
  public getImageUrl(@Body('key') key: string): string {
    return this.awsService.getAwsS3FileUrl(key);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  public async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{
    key: string;
    s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
  }> {
    return await this.awsService.uploadFileToS3('images', file);
  }

  @HttpCode(204)
  @Delete()
  public async deleteImage(@Body('key') objectKey: string): Promise<void> {
    await this.awsService.deleteS3Object(objectKey);
  }
}
