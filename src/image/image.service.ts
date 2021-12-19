import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadImage } from './entity/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(UploadImage)
    private uploadImageRepository: Repository<UploadImage>,
  ) {}

  public async uploadFile(images) {
    const uploadImages = [];
    for (const element of images) {
      const file = new UploadImage();
      file.originalName = element.originalname;
      file.encoding = element.encoding;
      file.mimeType = element.mimetype;
      file.size = element.size;
      file.url = element.location;

      uploadImages.push(file);
    }
    try {
      await this.uploadImageRepository.save(uploadImages);
      return 'Image Upload Success';
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
