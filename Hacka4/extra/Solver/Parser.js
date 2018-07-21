class Parser{

    static parse(input){
        const data = {};
        const parts = input.split('\n\n');
        data.people = parts[0].split('\n').slice(1).map(item => { return {
            id: parseInt(item.split('<')[0]),
            followers: parseInt(item.split('<')[1])
        }})
        data.projects = parts[1].split('\n').slice(1).map(item => {
            const properties = item.split(' ')[0].split('-');
            const likedBy = item.split(' ')[1].slice(1);
            return {
                stars: parseInt(properties[0]),
                forks: parseInt(properties[1]),
                issues: {
                    open: parseInt(properties[2]),
                    closed: parseInt(properties[3])
                },
                likedBy: likedBy.slice(0, likedBy.length - 1).split(',').map(item => parseInt(item))
            }
        });
        data.newProject = parts[2].split('\n').slice(1).map(item => {
            const properties = item.split(' ')[0].split('-');
            return {
                stars: parseInt(properties[0]),
                forks: parseInt(properties[1]),
                issues: {
                    open: parseInt(properties[2]),
                    closed: parseInt(properties[3])
                }
            }
        });
        return data;
    }

    static stringify(data){
        const projects = data.projects.map(item => item.stars + '-' + item.forks + '-' + item.issues.open + '-' + item.issues.closed + ' (' + item.likedBy.join(',') + ')').join('\n');
        const people = data.people.map(item => item.id + '<' + item.followers).join('\n');
        const newProject = data.newProject[0].stars + '-' + data.newProject[0].forks + '-' + data.newProject[0].issues.open + '-' + data.newProject[0].issues.closed
        return `PEOPLE(${data.people.length}):\n${people}\n\nPROJECTS(${data.projects.length}):\n${projects}\n\nHACKADEMY_PROJECT:\n${newProject}`;
    }

}

module.exports = Parser;