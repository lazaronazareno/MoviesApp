"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../index");
const controllers = __importStar(require("../controllers/movieControllers"));
const router = express_1.default.Router();
const diskStorage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../csv'),
    filename: (req, file, cb) => {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        cb(null, Date.now() + '-movies-' + file.originalname);
    }
});
const fileUpload = (0, multer_1.default)({
    storage: diskStorage
});
router.get('/', controllers.getMovies);
router.get('/:title', controllers.getMovieByTitle);
router.get('/search/:title', controllers.searchMoviesByTitle);
router.post('/', controllers.addMovie);
router.patch('/:title', controllers.editMovie);
router.delete('/delete/:title', controllers.deleteMovie);
router.post('/test/', controllers.postData);
router.post('/post/data', fileUpload.single('archivo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    index_1.con.connect((err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err) {
            res.status(500).send('server error');
        }
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const csvFileName = '../csv/' + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        const csvFilePath = path_1.default.join(__dirname, csvFileName);
        void (() => __awaiter(void 0, void 0, void 0, function* () {
            const jsons = yield (0, csvtojson_1.default)({ delimiter: ';' }).fromFile(csvFilePath);
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            for (let i = 0; i < jsons.length; i++) {
                const Titulo = jsons[i].titulo;
                const Genero = jsons[i].genero;
                const Año = jsons[i].año;
                const Director = jsons[i].director;
                const Actores = jsons[i].actores;
                const insertStatement = 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)';
                const items = [Titulo, Genero, Año, Director, Actores];
                console.log(insertStatement);
                console.log(items);
                /*           con.promise().query(insertStatement).then( (items) ) => {
                    console.log(items)
                  }).catch(console.log('error')).then(() => con.end())
         */
                yield index_1.con.query(insertStatement, items, (err, results) => {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (err && i < jsons.length) {
                        console.log('Unable to insert item at row', i + 1);
                        return console.log(err);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                        console.log('create new database' + results);
                        return results;
                    }
                });
            }
            console.log('done');
        }))().catch((err) => {
            return err;
        }).then(() => index_1.con.end());
        /*     await csv({ delimiter: ';' }).fromFile(csvFilePath).then((source) => {
            for (let i = 0; i < source.length; i++) {
              const Titulo = source[i].titulo
              const Genero = source[i].genero
              const Año = source[i].año
              const Director = source[i].director
              const Actores = source[i].actores
      
              const insertStatement = 'INSERT INTO movielist(titulo, genero, año, director, actores) VALUES(?, ?, ?, ?, ?)'
              const items = [Titulo, Genero, Año, Director, Actores]
              console.log(insertStatement)
              console.log(items)
      
              con.query(insertStatement, items, (err: any, results: any, fields: any) => {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (err) {
                  console.log('Unable to insert item at row', i + 1)
                  return console.log(err)
                }
              })
            }
            console.log('Data stored in movies database')
          }, function (err) {
            console.log(err)
          }) */
    }));
}));
exports.default = router;
