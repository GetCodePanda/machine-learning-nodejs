const 
    ml = require("ml-regression"),
    csv = require('csvtojson'),
    SLR = ml.SLR,
    csvFilePath = 'data.csv';

let csvData = [],
    x = [],
    y = [];

let regressionModel;

csv()
    .fromFile(csvFilePath)
    .on('json' , (jsonObj)=>{
        csvData.push(jsonObj);
    })
    .on('done', ()=>{
        dressData(); // To get data points from JSON Objects
        performRegression(); 
    })

function dressData(){
    csvData.forEach((row) => {
        x.push(f(row.radio));
        y.push(f(row.sales));
    });
}

function f(s){
    return parseFloat(s);
}

const readline = require('readline'); // For user prompt to allow predictions

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

function performRegression() {
    regressionModel = new SLR(x,y);
    console.log(regressionModel.toString(3));
    predictOutput();
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
        predictOutput();
    });
}