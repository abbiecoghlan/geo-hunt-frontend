let puzzleInterfaceShowing = false
let interfaceShowing = false

const baseUrl = 'http://localhost:3000'
const puzzlesUrl = 'http://localhost:3000/puzzles'

const puzzleInterfaceDiv = document.getElementById('puzzle-interface')
const interfaceDiv = document.getElementById('interface')


const main = () => {
  addNavListeners()
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
  // fetch puzzles
  // create a ul named puzzle list
  // create li nodes with the puzzle names and append them
  //event LISTENERS
  
  const ul = document.createElement('ul')
  interfaceDiv.append(ul)

  fetchData(puzzlesUrl)
  .then(puzzles => puzzles.forEach(puzzle => renderPuzzleLi(puzzle, ul))
  )


}

  // puzzles.forEach(puzzle => renderPuzzleLi(puzzle, ul)

const renderPuzzleLi = (puzzle, ul) => {

  const li = document.createElement('li')

  li.innerText = `${puzzle.title} - ${puzzle.difficulty}`
  li.dataset.id = puzzle

  // completion percentage
  // highest rated
  // most played
  // add difficulty categorizer/sections
  // debugger
  ul.append(li)
}

main()