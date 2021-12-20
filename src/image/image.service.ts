import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadImage } from './entity/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(UploadImage)
    private uploadImageRepository: Repository<UploadImage>,
  ) {}

  public async getAllImage() {
    return await this.uploadImageRepository
      .createQueryBuilder('uploadImage')
      .getMany();
  }

  public async getImage(param) {
    const image = await this.uploadImageRepository
      .createQueryBuilder('UploadImage')
      .where('UploadImage.id =:id', { id: param })
      .getOne();

    if (!image) {
      throw new BadRequestException('image Not found');
    }

    return image;
  }

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
