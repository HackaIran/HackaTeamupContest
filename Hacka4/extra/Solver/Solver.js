const Perceptron = require('./Perceptron');
const Parser = require('./Parser')

const maxStar = 20000;
const openIssues = 2000;
const closeIssues = 2000;
const maxForks = 3000;
// const maxCommitsValue = 1000;

const randE = () => (Math.random()*2-1)

class Solver{

    /**
     * Solves the problem
     */

    solve(data){

        // Let's train each persons perceptron
        const input = Parser.parse(data.input);
        const output = parseInt(data.output);

        for(let person of input.people){
            person.perceptron = new Perceptron([-0.1, 0.1, -0.1]);
        }

        for(let project of input.projects){

           // let projectCommitValue = this.computeCommitsValues(project.dayCommits);
            
            let inputs = [project.stars/maxStar, project.issues.closed/project.issues.open , project.forks/maxForks];

            for(let person of input.people){

                if(project.likedBy.includes(person.id)){

                    // This person liked the previous project

                    person.perceptron.train(inputs, 1);

                }else{

                    // This person didn't like the previous project

                    person.perceptron.train(inputs, -1);

                }

            }

        }

        // Now show time!

        const project = input.newProject[0];

        //let projectCommitValue = this.computeCommitsValues(project.dayCommits);
        
        let inputs = [project.stars/maxStar, project.issues.closed/project.issues.open , project.forks/maxForks];

        for(let person of input.people){

            let guess = person.perceptron.guess(inputs);
            if(!project.likedBy){
                project.likedBy = [];
            }

            if(guess == 1){

                project.stars += 1 + Math.floor(person.followers * 20/100);

            }

        }
        console.log(project.stars);
        return project.stars;

    }

    /**
     * Computes which persons like which projects
     * @param {Array} projects - The projects
     * @param {Array} people - People
     * @returns {Array} Projects
     */

    solveForGenerator(projects, people){
        for (let project of projects) {
            for (let person of people) {
                let input = [
                    project.stars / maxStar,
                    project.issues.open / openIssues,
                    project.issues.closed / closeIssues,
                    project.forks / maxForks,
                    //this.computeCommitsValues(project.weekCommits) / maxCommitsValue
                ];
                if(this.checkUserLikesOrNot(person.weight, input)){
                    project.likedBy.push(person.id);
                }
            }
        }
        return projects;
    }

    /**
     * Checks whether a specific person likes a project or not
     * @param {Array} defaultWeight - The weight of the person's desires
     * @param {Array} input - The data of the project
     * @returns {Boolean} 
     */

    checkUserLikesOrNot(defaultWeight, input){

        let perceptron = new Perceptron(defaultWeight);
        if(perceptron.guess(input) == 1){
            return true;
        }
        return false;

    }

}

module.exports = Solver;