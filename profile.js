const displayProfile = () => {
    fetchData(profileUrl + `/${userId}`)
    .then(user => {

        console.log(user)
    //     const username = document.createElement('h1')
    //     username.innerText = `Welcome, ${user.name}`

    //     const table = document.createElement('table')
    //     table.innerHTML = 
    //     `<thead>
    //     <tr>
    //       <th>PUZZLE</th>
    //       <th>STATUS</th>
    //       <th>TIME TAKEN</th>      
    //       <th>STATUS</th>
    //     </tr>
    //   </thead>`

    //     interfaceDiv.append(username, table)



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