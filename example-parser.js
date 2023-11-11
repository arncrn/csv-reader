// this parser will filter out duplicate values for a single column
class ExampleParser {
    dataSet;
    filterHeader;
    
    constructor(filterHeader) {
        if (!filterHeader) {
            throw new Error('You must provide a header name');
        }
        this.dataSet = new Set();
        this.filterHeader = filterHeader;
    }

    parseData(row) {
        const value = row[this.filterHeader];

        this.dataSet.add(value);
    }

    onComplete() {
        console.log("The unique values in this column are:")
        console.log('######');
        Array.from(this.dataSet.values()).forEach(value => {
            console.log(value);
        });
        console.log('######');
    }
}

module.exports = ExampleParser;