const displayHome = () => {
    const homeDiv = document.createElement('div')

    homeDiv.addEventListener('click', event => {
        event.preventDefault()
    })

    homeDiv.className = 'text-center'

    const greeting = document.createElement('h3')
    greeting.innerText = "Welcome to Geo Hunt!"

    const p = document.createElement('p')
    p.innerText = "Geo Hunt will test and expand your geographical knowledge. To get started, hit the login tab above to sign in or create an account, or check out the leaderboards and puzzle categories."
    p.className = 'intro'
    
    const img = document.createElement('img')
    img.className = 'compass'
    
    img.src="http://clipart-library.com/images/di45B8j6T.png"
    
    homeDiv.append(greeting, p, img)
    interfaceDiv.append(homeDiv)
}