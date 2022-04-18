"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const diskStorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../csv'),
    filename: (req, file, cb) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        cb(null, Date.now() + '-movies-' + file.originalname);
    }
});
exports.fileUpload = (0, multer_1.default)({
    storage: diskStorage
}).single('archivo');
