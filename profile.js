const displayProfile = () => {
    fetchData(userUrl + `/${userId}`)
    .then(user => {

      let puzzleArray = []

      user.attempts.forEach(attempt => {
          const puzzle = attempt.puzzle
          debugger
          if (!puzzleArray.includes(puzzle)){
              return puzzleArray.push(puzzle)
          }
      })

      
        console.log(user)
        const username = document.createElement('h1')
        username.innerText = `Welcome, ${user.username}`

        const table = document.createElement('table')
        table.innerHTML = 
        `
        <thead>
          <tr>
            <th>Attempt</th>

            <th>Puzzle</th>      
            <th>Status</th>
            <th>Time Taken</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>${user.attempts[0].puzzle.title}</td>
            <td>${user.attempts[0].puzzle.title}</td>
            <td></td>
            <td></td>
          </tr>
          <tr></tr>
        </tbody>
        `

        interfaceDiv.append(username, table)



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