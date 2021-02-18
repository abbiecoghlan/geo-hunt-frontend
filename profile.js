const displayProfile = () => {
    fetchData(userUrl + `/${userId}`)
    .then(user => {
        const username = document.createElement('h1')
        username.innerText = `Welcome, ${user.name}`

        const table = document.createElement('table')

        interfaceDiv.append(username)



    })
}