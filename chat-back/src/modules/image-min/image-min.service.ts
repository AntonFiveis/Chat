import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import * as sharp from 'sharp';
@Injectable()
export class ImageMinService {
  async minimizeImage(
    image: Express.Multer.File,
    destPath: string,
    quality: number,
    name: string,
  ): Promise<void> {
    await sharp(image.buffer)
      .jpeg({
        progressive: true,
        quality,
        force: false,
      })
      .png({
        progressive: true,
        quality,
        force: false,
      })
      .toFile(`${destPath}/${name}`);
  }

  // async makePictogram(
  //   image: Express.Multer.File,
  //   destPath: string,
  //   { x, y, width, height, offsetWidth, offsetHeight },
  //   name: string,
  // ): Promise<void> {
  //   const pictogram = sharp(image.buffer);
  //   const data = await pictogram.metadata();
  //   const newCrop = {
  //     left: Math.floor((x * data.width) / offsetWidth),
  //     top: Math.floor((y * data.height) / offsetHeight),
  //     width: Math.floor((width * data.width) / offsetWidth),
  //     height: Math.floor((height * data.height) / offsetHeight),
  //   };
  //   await pictogram.extract(newCrop).resize(640).toFile(`${destPath}/${name}`);
  //   // return pictogram
  // }

  // x=0 y=0 in left-up corner
  makeSuitablePicture(
    pathToFile: string,
    destPath: string,
    props: sharp.Region,
  ): Promise<sharp.OutputInfo> {
    const res = pathToFile.split('/');
    return sharp(pathToFile)
      .extract(props)
      .toFile(`${destPath}/${res[res.length - 1]}`);
  }

  editFileName(file: Express.Multer.File): string {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array.from({ length: 4 }, () =>
      Math.round(Math.random() * 16).toString(16),
    ).join('');
    return `${name}-${randomName}${fileExtName}`;
  }
  async resizeToBuffer(image: Buffer): Promise<Buffer> {
    const pictogram = sharp(image);
    return await pictogram.resize(640, 640).toBuffer();
  }
}
