const SolverModule = require('./extra/Solver/Solver');

const solverModule = new SolverModule();

class Solver {

    constructor () {

    }

    /**
     * gets result and solves it
     * @param result
     * @return Object { solved: Boolean, steps: Number, hasMistake: Boolean, mistake: String }
     */
    solve (result) {

        const answer = solverModule.solve({
            input: result.input,
            output: result.output
        });
        const output = parseInt(result.output);

        const rate = Math.min(1, Math.max(0, 1 - Math.max(0, Math.abs(output - answer) - output*0.05) / 100));

        return {
            solved: rate > 0,
            rate: rate,

            minDuration: 50,
            maxDuration: 500,

            hasMistakes: false,
            mistake: ''
        }
    }

}

const solver = new Solver();

module.exports = solver;