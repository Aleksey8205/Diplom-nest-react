import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { File } from 'multer';

export async function saveFile(file) {
  const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  const fileName = `${randomName}${extname(file.originalname)}`;
  const filePath = `./uploads/covers/${fileName}`;
  await new ((resolve, reject) => {
    file.mv(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  return filePath;
}