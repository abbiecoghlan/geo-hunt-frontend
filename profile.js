const displayProfile = () => {
    fetchData(userUrl + `/${userId}`)
    .then(user => {
      
        // console.log(user)
        const username = document.createElement('h1')
        username.innerText = `Welcome, ${user.username}`
        username.className = 'text-center'

        const tableTitle = document.createElement('p')
        tableTitle.innerText = 'Attempts Record'
        tableTitle.className = 'text-center'

        const table = document.createElement('table')
        table.className = "table table-hover table-sm tabel-responsive table-success"
        table.innerHTML = 
        `
        <thead>
          <tr>
            <th>Puzzle</th>      
            <th>Status</th>
            <th>Time Taken</th>
          </tr>
        </thead>

        <tbody>
        </tbody>
        `
        const button = document.createElement('button')
        button.innerText = "Reset Account"
        button.dataset.id = user.id
        button.className = "btn btn-danger mr-1"
        button.id = "reset-btn"
        
        interfaceDiv.append(username, tableTitle, table, button)

        user.attempts.forEach(attempt => {

          const tr = document.createElement('tr')
          const body = document.querySelector('tbody')
          
          let time
          if (!attempt.time_taken) 
            { time = "n/a"
          } else {
            time = attempt.time_taken
          }

          tr.innerHTML = 
          `
          <td>${attempt.puzzle.title}</td>
          <td>${attempt.status}</td>
          <td>${time}</td>
          `
          body.append(tr)
          
        })

        addButtonListener()


    })
}

const addButtonListener = () => {
  const button = document.getElementById('reset-btn')

  button.addEventListener('click', event => {
    event.preventDefault()

    const reqObj = {
      method: 'DELETE'
    }

    fetchDataWithReqObj(resetUrl + `/${event.target.dataset.id}`, reqObj)
    .then(message => {
      interfaceDiv.innerHTML=""
      displayProfile()
      alert(message.message)
    })

  })
}