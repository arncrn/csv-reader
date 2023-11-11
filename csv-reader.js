const fs = require('fs');
const csvParser = require('csv-parser');
const ExampleParser = require('./example-parser');

const csvFilePath = process.argv[2].toLowerCase();
const header = process.argv[3];

if (!csvFilePath) {
    throw new Error('Must provide a csv file path')
} else if (!csvFilePath.endsWith('csv')) {
    throw new Error('The file must be a CSV file');
}

class CsvReader {
    parser;

    constructor(parser) {
        this.parser = parser;
    }

    readCsv() {
        console.log(`Reading CSV file ${csvFilePath}`)
        fs.createReadStream(csvFilePath)
            .pipe(csvParser())
            .on('data', (row) => {
                this.parser.parseData(row);
            })
            .on('end', () => {
                console.log('CSV file processed.');
                this.parser.onComplete();
            })
    }
}

new CsvReader(new ExampleParser(header)).readCsv(csvFilePath);
