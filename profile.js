const displayProfile = () => {
    fetchData(userUrl + `/${userId}`)
    .then(user => {

        console.log(user)
        const username = document.createElement('h1')
        username.innerText = `Welcome, ${profile.user.username}`

        const table = document.createElement('table')
        table.innerHTML = 
        `
        <thead>
          <tr>
            <th>PUZZLE</th>

            <th>Attempts</th>      
            <th>STATUS</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>${profile.puzzles[0].title}</td>
            <td>${profile.puzzles[0].status}</td>
            <td></td>
            <td></td>
          </tr>
          <tr></tr>
        </tbody>
        `

        interfaceDiv.append(username)



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