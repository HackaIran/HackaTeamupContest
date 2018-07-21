const activation = sum => Math.sign(sum) || 1;


class Perceptron {

    /**
     * @constructor - Initializes the perceptron
     * @param {Array} defaultWeights - The default weights of the inputs
     * @param {Number} learningRate - The learning rate of the perceptron (Between 0 & 1)
     */

    constructor (defaultWeights, learningRate = 0.1) {

        this.learningRate = learningRate;
        
        this.weights = defaultWeights;

    }

    /**
     * Guesses whether should do or choose sth or not
     * @param {Array} inputs - The data
     * @returns {Number} 1 || -1 => 1 for yes (choosed), -1 for no (didn't choose)
     */

    guess (inputs) {

        let sum = 0;

        for (let i in this.weights){

            sum += inputs[i] * this.weights[i];

        }

        return activation(sum);

    }

    /**
     * Trains the perceptron so that it's accuracy will be better
     * @param {Array} inputs - The data
     * @param {Number} target - 1 || -1 => 1 for yes (choosed), -1 for no (didn't choose)
     */

    train (inputs, target) {

        const guess = this.guess(inputs);

        const error = target - guess;

        // Tune all the weights


        for (let i in this.weights) {
            this.weights[i] += (error * inputs[i] * this.learningRate);
        }

    }
}

module.exports = Perceptron;