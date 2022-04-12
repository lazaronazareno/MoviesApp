import { generateJsonFileFromCsv } from 'convert-csv-to-json';

let fileInputName = './movie-server/src/services/Data.csv'; 
let fileOutputName = './movie-server/src/services/Data.json';

generateJsonFileFromCsv(fileInputName,fileOutputName);