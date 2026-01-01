import { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const MulterConfig = {
  storage: diskStorage({
    destination(req, file, cb) {
      const uploadDir = path.resolve(__dirname, 'uploads');
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueSuffix = uuidv4();
      cb(null, `${uniqueSuffix}${ext}`);
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