const displayHome = () => {
    const homeDiv = document.createElement('div')

    homeDiv.addEventListener('click', event => {
        event.preventDefault()
    })

    homeDiv.className = 'text-center'

    const greeting = document.createElement('h1')
    greeting.innerText = "welcome to ..."
    homeDiv.append(greeting)
    interfaceDiv.append(homeDiv)
}