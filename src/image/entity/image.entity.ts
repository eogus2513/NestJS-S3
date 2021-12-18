import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upload_image')
export class UploadImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  encoding: string;

  @Column()
  mimeType: string;

  @Column('decimal', { precision: 10, scale: 2 })
  size: number;

  @Column({ comment: 's3 업로드된 localtion url' })
  url: string;
}
