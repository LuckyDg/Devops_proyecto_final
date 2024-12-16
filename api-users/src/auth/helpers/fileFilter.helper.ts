import * as multer from 'multer';
import * as path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = `${Date.now()}${fileExtension}`;
    cb(null, filename);
  },
});

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedExtensions = /jpg|jpeg|png|gif/;
  const isExtensionValid = allowedExtensions.test(file.mimetype);

  if (!isExtensionValid) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
