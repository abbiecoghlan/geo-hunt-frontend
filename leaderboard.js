const fetchStatistics = () => {
    fetchData('http://localhost:3000/users')
    .then(users => renderLeaderboards(users))
}

const renderLeaderboards = (users) => {
    // users.forEach(attempt => console.log)
    console.table(users)

    mostPuzzlesCompleted(users)
}

const mostPuzzlesCompleted = (users) => {
    // Math
    debugger
}