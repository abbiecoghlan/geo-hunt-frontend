let puzzleInterfaceShowing = false
let interfaceShowing = false

const baseUrl = 'http://localhost:3000'
const puzzlesUrl = 'http://localhost:3000/puzzles'

const puzzleInterfaceDiv = document.getElementById('puzzle-interface')
const interfaceDiv = document.getElementById('interface')


const main = () => {
  addNavListeners()
  addInterfaceListeners()
}

const fetchData = (url) => {
  return fetch(url)
  .then(resp => resp.json())
}

const addNavListeners = () => {
  const nav = document.getElementById('nav-bar')

  nav.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.id === 'puzzle-btn'){
      console.log('puzzlebutton')
      interfaceDiv.innerHTML = ""
      toggleInterface()
      displayPuzzles()
    }

  })
}

const addInterfaceListeners = () => {

  interfaceDiv.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.id === 'puzzle-select'){
      loadPuzzle(event.target)
    }
  }

)}

const togglePuzzleInterface = () => {

  if (!puzzleInterfaceShowing){
    puzzleInterfaceDiv.style.display = ""
    puzzleInterfaceShowing = true
  } else {
    puzzleInterfaceDiv.style.display = "none"
    puzzleInterfaceShowing = false
  }
}

const toggleInterface = () => {
  if (!interfaceShowing){
    interfaceDiv.style.display = ""
    interfaceShowing = true
  } else {
    interfaceDiv.style.display = "none"
    interfaceShowing = false
  }
}

const displayPuzzles = () => {
  
  const ul = document.createElement('ul')
  const puzzleHeader = document.createElement('h2')
  puzzleHeader.innerText = 'Browse Puzzles'
  interfaceDiv.append(puzzleHeader, ul)

  fetchData(puzzlesUrl)
  .then(puzzles => puzzles.forEach(puzzle => renderPuzzleLi(puzzle, ul))
  )


}

const renderPuzzleLi = (puzzle, ul) => {

  const li = document.createElement('li')
// make li look like a link
  li.innerText = `${puzzle.title} - ${puzzle.difficulty}`
  li.id = 'puzzle-select'
  li.dataset.id = puzzle.id

  // completion percentage
  // highest rated
  // most played
  // add difficulty categorizer/sections
  // debugger
  ul.append(li)
}

const loadPuzzle = (eventTarget) => {

  // create a reqObect with id as cargo
  // fetch specfic puzzle utilizing the id stored in the event target
  // set our global targetLat and targetLong
  // receive, render initial clue to screen toggling puzzle interface and timer

  fetchData(puzzlesUrl + `/${eventTarget.dataset.id}`)
  .then(puzzle => {console.log(puzzle)
  debugger
  })
  
  
}

main()