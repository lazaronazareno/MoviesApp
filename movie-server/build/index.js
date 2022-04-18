"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
const express_1 = __importDefault(require("express"));
const uploadfile_1 = require("./middleware/uploadfile");
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const vars_config_1 = require("./vars.config");
const movies_1 = __importDefault(require("./routes/movies"));
const dataSource = vars_config_1.DATA_SOURCES.mySqlDataSource;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(uploadfile_1.fileUpload);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.con = mysql2_1.default.createConnection({
    host: dataSource.DB_HOST,
    user: dataSource.DB_USER,
    password: dataSource.DB_PASSWORD,
    database: dataSource.DB_DATABASE
});
exports.con.connect((err) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('connected');
    const createStatament = 'CREATE TABLE movielist( titulo varchar(255) unique, genero varchar(255), año char(20), director varchar(255), actores varchar(255), primary key(titulo));';
    exports.con.query(createStatament, (_err, _drop) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (err)
            return console.log(err);
    });
});
const PORT = 4000;
app.use('/', movies_1.default);
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});
