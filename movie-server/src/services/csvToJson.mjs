import { generateJsonFileFromCsv } from 'convert-csv-to-json'

const fileInputName = './movie-server/src/services/Data.csv'
const fileOutputName = './movie-server/src/services/Data.json'

generateJsonFileFromCsv(fileInputName, fileOutputName)
