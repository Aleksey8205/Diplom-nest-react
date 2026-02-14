import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const MulterConfig = {
  storage: diskStorage({
    destination(req, file, cb) {
      const rootDir = path.resolve(__dirname, '../../');
      const uploadDir = path.join(rootDir, 'uploads');
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${ext}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, 
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.match(/\/jpg|jpeg|png|gif/)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
};