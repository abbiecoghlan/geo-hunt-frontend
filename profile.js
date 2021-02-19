const displayProfile = () => {
    fetchData(userUrl + `/${userId}`)
    .then(user => {
      
        console.log(user)
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
        interfaceDiv.append(username, tableTitle, table)

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




    })
}

{/* <table>
  <thead>
    <tr>
      <th>TITLE</th>
      <th>CATEGORY</th>
      <th>DESCRIPTION</th>      
      <th>STATUS</th>
    </tr>
  </thead>
  <tbody>
    <% @user.listed_items.each do |l| %>
      <tr>
        <td><%= link_to "#{l.title}", l  %></td>
        <td><%= l.category.name %></td>
        <td><%= l.description %></td>
        <td> 
             <% if l.claimed %>
         <%= "Item has been claimed" %>
                   <% else %>
          <%= "Item is available" %>
          <% end %> </td>
      </tr>
    <% end %>
  </tbody>
</table> */}