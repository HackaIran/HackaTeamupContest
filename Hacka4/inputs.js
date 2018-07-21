const getInput = require('./extra/Generator/index');

let inputs = [];

const generateInputs = () => {
    inputs = [];
    for (let i = 1; i <= 10; i++) {
        inputs.push(getInput(i));
    }
}

generateInputs();
setInterval(generateInputs, 5 * 60 * 1000);

module.exports = {
    get: (i) => inputs[i],
    length: inputs.length
};