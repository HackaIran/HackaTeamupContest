const Parser = require('../Solver/Parser');
const maxStar = 20000;
const maxIssues = 4;
const maxForks = 3000;

function generatePeople(level){
    let people = [];
    for(let i = 0; i < ((level * 15) + 15); i++){
        //followers are three type
        //1-950 : followers between 0-150
        //951-975 : followers between 150-500
        //976-990 : followers between 500-1000
        //991-997 : followers between 2500-5000
        //998-999 : followers between 5000-20000
        //1000 : followers between 20000-77000
        let followers = Math.floor(Math.random() * 975)+1;
        if(followers<=950){
            followers = Math.floor(Math.random() * 151);
        }else if(followers <= 975){
            followers = Math.floor(Math.random() * 351)+150;
        }else if(followers <= 990){
            followers = Math.floor(Math.random() * 2001)+500;
        }else if(followers <= 997){
            followers = Math.floor(Math.random() * 2501)+2500;
        }else if(followers <= 999){
            followers = Math.floor(Math.random() * 15001)+5000;
        }else if(followers == 1000){
            followers = Math.floor(Math.random() * 57001)+20000;
        }

        const project = {
            stars: (Math.random() * 0.3),
            issues: (Math.random() * 0.3),
            forks: (Math.random() * 0.3),
        }

        let person = {
            id: i+1,
            weight: [project.stars, project.issues, project.forks],
            followers: followers,
            interest: Math.floor(Math.random() * 3)
        }
        let ranPersonWeight = Math.floor(Math.random() * 4);
        for(let i = 0; i < 4; i++){
            if(i != ranPersonWeight){
                
                person.weight[i] *= 1.1;
                
            }else{
                person.weight[i] *= 0.3;
            }
        }

        people.push(person);
    }
    return people;
}

function generateNewProject(){
//stars are three type
        //1-70 : stars between 0-150
        //70-85 : stars between 150-500
        //85-92 : stars between 500-2500
        //92-97 : stars between 2500-5000
        //97-99 : stars between 5000-20000
        //100 : stars between 20000-55000
        let stars = Math.floor(Math.random() * 100)+1;
        let forks = 0;
        let issues = 0;
        if(stars<=70){
            stars = Math.floor(Math.random() * 151) + 45;
            issues = Math.floor(Math.random() * 60) + 14;
            forks = Math.floor(Math.random() * 4) + 4;
        }else if(stars <= 85){
            stars = Math.floor(Math.random() * 351)+150;
            issues = Math.floor(Math.random() * 120) + 15;
            forks = Math.floor(Math.random() * 40) + 20;
        }else if(stars <= 92){
            stars = Math.floor(Math.random() * 2001)+500;
            issues = Math.floor(Math.random() * 240) + 28;
            forks = Math.floor(Math.random() * 120) + 60;
        }else if(stars <= 97){
            stars = Math.floor(Math.random() * 2501)+2500;
            issues = Math.floor(Math.random() * 600) + 42;
            forks = Math.floor(Math.random() * 400) + 200;
        }else if(stars <= 99){
            stars = Math.floor(Math.random() * 15001)+5000;
            issues = Math.floor(Math.random() * 1500) + 65;
            forks = Math.floor(Math.random() * 1400) + 800;
        }else if(stars == 100){
            stars = Math.floor(Math.random() * 35001)+20000;
            issues = Math.floor(Math.random() * 6001) + 130;
            forks = Math.floor(Math.random() * 5501) + 2200;
        }
        issues = generateIssues(issues, stars);
        forks = generateForks(forks, issues);
        
        return{
            id: 1,
            stars,
            issues,
            forks,
            //weekCommits: generateWeekCommit(stars),
            likedBy: []
        }
}

function generateProjects(level){
    let projects = [];
    for(let i = 0; i < (level * 20); i++){
        //stars are three type
        //1-70 : stars between 0-150
        //70-85 : stars between 150-500
        //85-92 : stars between 500-2500
        //92-97 : stars between 2500-5000
        //97-99 : stars between 5000-20000
        //100 : stars between 20000-55000
        let stars = Math.floor(Math.random() * 100)+1;
        let forks = 0;
        let issues = 0;
        if(stars<=70){
            stars = Math.floor(Math.random() * 151);
            issues = Math.floor(Math.random() * 60) + 10;
            forks = Math.floor(Math.random() * 4) + 2;
        }else if(stars <= 85){
            stars = Math.floor(Math.random() * 351)+150;
            issues = Math.floor(Math.random() * 120) + 15;
            forks = Math.floor(Math.random() * 40) + 20;
        }else if(stars <= 92){
            stars = Math.floor(Math.random() * 2001)+500;
            issues = Math.floor(Math.random() * 240) + 28;
            forks = Math.floor(Math.random() * 120) + 60;
        }else if(stars <= 97){
            stars = Math.floor(Math.random() * 2501)+2500;
            issues = Math.floor(Math.random() * 600) + 42;
            forks = Math.floor(Math.random() * 400) + 200;
        }else if(stars <= 99){
            stars = Math.floor(Math.random() * 15001)+5000;
            issues = Math.floor(Math.random() * 1500) + 65;
            forks = Math.floor(Math.random() * 1400) + 800;
        }else if(stars == 100){
            stars = Math.floor(Math.random() * 35001)+20000;
            issues = Math.floor(Math.random() * 6001) + 130;
            forks = Math.floor(Math.random() * 5501) + 2200;
        }
        issues = generateIssues(issues, stars);
        forks = generateForks(forks, issues);
        
        projects.push({
            id: i+1,
            stars,
            issues,
            forks,
            //weekCommits: generateWeekCommit(stars),
            likedBy: []
        })
    }
    return projects;
}

function generateForks(forks, issues){
    let closed = issues.closed;
    let open = issues.open;
    let res = closed/open;
    if(res <= 0.8){
        forks = forks + Math.floor(Math.random() * forks) + Math.floor(Math.random() * forks);
    }
    return forks;
}

function generateWeekCommit(stars){

    //randomType are three type
    //1-4 : a project which have random commits
    //5 : a project which only have commits in weekdays
    //6 : a project which only have commits in weekends
    let randomType = 0;
    let days = [];
    if(stars < 4999){
        randomType = Math.floor(Math.random() * 6)+1;
    }else{
        randomType = Math.floor(Math.random() * 5)+1;
    }

    for(let i = 0; i < 28; i++){
        let commits = 0;
        
        if(randomType <= 4){
            commits = Math.floor(Math.random() * (35 - Math.floor(Math.random(25))));
        }else if(randomType == 5){
            //Commits are in weekDays
            if((i+1)== 6||(i+1)== 7||(i+1)== 13||(i+1)== 14||(i+1)== 20||(i+1)== 21||(i+1)== 27||(i+1)== 28){
                commits = 0;
            }else{
                commits = Math.floor(Math.random() * (35 - Math.floor(Math.random(25))));
            }
        }else if(randomType == 6){
            //Commits are in weekEnds
            if((i+1)== 6||(i+1)== 7||(i+1)== 13||(i+1)== 14||(i+1)== 20||(i+1)== 21||(i+1)== 27||(i+1)== 28){
                commits = Math.floor(Math.random() * (35 - Math.floor(Math.random(25))));
            }else{
                commits = 0;
            }
        }
        if(Math.floor(Math.random() * 3) == 0){
            commits = 0;
        }
        days.push(commits);
    }
    return days;
}

function generateIssues(issues, stars){
    issues = (issues / 10)*9;
    let closed = 0;
    let open = 0;
    open+= issues/9;
    if(stars > 4999){
        closedMore = (Math.floor(Math.random() * 3) +4);
        closed+= (issues/9) * closedMore;
        issues-= (issues/9) * closedMore;
    }
    for(let i = 0; i < issues; i++){
        let random = Math.floor(Math.random()*2);
        if(random == 1){
            closed++;
        }else{
            open++;
        }
    }
    let ifClosed = Math.floor(Math.random()*2);
    let diffrence = Math.floor(Math.random() * (issues / 9) * Math.floor(Math.random() * 3)+2);
    if(ifClosed == 1){
        closed += diffrence;
        open -= diffrence;
    }else{
        closed -= diffrence;
        open += diffrence;
    }
    return {open: Math.floor(open), closed: Math.floor(closed)};
}

function doesHeLikes(project, personWeight, interest){
    let pIssues = project.issues.closed/project.issues.open;
    let pStars = project.stars;
    let pForks = project.forks;
    
    let personIssues = (personWeight[1] * maxIssues)+1;
    let personStars = (personWeight[0] * maxStar)+1;
    let personForks = (personWeight[2] * maxForks)+1;

    let count = 0;
    if(pIssues >= personIssues){
        count++;
        if(interest == 1){
            count++;
        }
    }

    if(pStars > personStars){
        count++;
        if(interest == 0){
            count++;
        }
    }

    if(pForks > personForks){
        count++;
        if(interest == 2){
            count++;
        }
    }

    if(count >= 2){
        return 1;
    }else{
        return 0;
    }


}

const getInput = (level) => {
    const people = generatePeople(level);
    let projects = generateProjects(level);
    let newProject = generateNewProject();

    for(let proj of projects){
        for(let person of people){
            if(doesHeLikes(proj, person.weight, person.interest) == 1){
                proj.likedBy.push(person.id);
            }
        }
    }

    const data = {
        projects,
        people,
        newProject: [newProject]
    };

    return Parser.stringify(data)
}

module.exports = getInput;