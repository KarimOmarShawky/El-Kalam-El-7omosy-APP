import multer from 'multer';
import {AppError} from '../error/error.js';
import crypto from 'crypto';

export function fileUpload(allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']) {
    return multer({
        fileFilter: (req, file, cb) => {
            if (!allowedFileTypes.includes(file.mimetype)) {
                return cb(new AppError('Invalid file type'), false);
            }
            cb(null, true);
        },
        storage: multer.diskStorage({
            destination: 'uploads',
            filename: (req, file, cb) => {
                const uniqueId = crypto.randomUUID();
                cb(null, `${uniqueId}-${file.originalname}`);
            }
        })
    });
}

export function uploadSingleFile(fieldName , allowedFileTypes) {
    return fileUpload(allowedFileTypes).single(fieldName);
}

export function uploadMultipleFiles(fieldName, maxCount, allowedFileTypes) {
    return fileUpload(allowedFileTypes).array(fieldName, maxCount);
}

export function uploadFields(fields, allowedFileTypes) {
    return fileUpload(allowedFileTypes).fields(fields);
}
