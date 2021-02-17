let puzzleInterfaceShowing = false
// let interfaceShowing = false

const baseUrl = 'http://localhost:3000'
const puzzlesUrl = 'http://localhost:3000/puzzles'
const attemptsUrl = 'http://localhost:3000/attempts'

const puzzleInterfaceDiv = document.getElementById('puzzle-interface')
const interfaceDiv = document.getElementById('interface')
const submitBtn = document.getElementById('submit-btn')


const main = () => {
  addNavListeners()
  addInterfaceListeners()
  addPuzzleInterfaceListeners()
}

const fetchData = (url) => {
  return fetch(url)
  .then(resp => resp.json())
}

const fetchDataWithReqObj = (url, reqObj) => {
  return fetch(url, reqObj)
  .then(resp => resp.json())
}

const addNavListeners = () => {
  const nav = document.getElementById('nav-bar')

  nav.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.id === 'puzzle-btn'){
      console.log('puzzlebutton')
      interfaceDiv.innerHTML = ""
      // toggleInterface()
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

const addPuzzleInterfaceListeners = () => {

  puzzleInterfaceDiv.addEventListener('click', event => { 
    event.preventDefault()

    if (event.target.id === 'clue-btn'){
      revealClue()
    }

    if (event.target.id === 'submit-btn'){
      verify(targetLat, targetLong, currentLat, currentLong, )
    }
  })
}

// const togglePuzzleInterface = () => {
//   if (!puzzleInterfaceShowing){
//     puzzleInterfaceDiv.style.display = ""
//     puzzleInterfaceShowing = true
//   } else {
//     puzzleInterfaceDiv.style.display = "none"
//     puzzleInterfaceShowing = false
//   }
// }

// const toggleInterface = () => {
//   if (!interfaceShowing){
//     interfaceDiv.style.display = ""
//     interfaceShowing = true
//   } else {
//     interfaceDiv.style.display = "none"
//     interfaceShowing = false
//   }
// }

const togglePuzzleInterface = () => {
  if (!puzzleInterfaceShowing) {
    interfaceDiv.style.display = "none"
    puzzleInterfaceDiv.style.display = ""
    puzzleInterfaceShowing = true
  } else {
    puzzleInterfaceDiv.style.display = "none"
    interfaceDiv.style.display = ""
    puzzleInterfaceShowing = false
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

  ul.append(li)
}

const loadPuzzle = (eventTarget) => {
  togglePuzzleInterface()
  // fetch specfic puzzle utilizing the id stored in the event target ~
  // set our global targetLat and targetLong
  // receive, render initial clue to screen toggling puzzle interface and timer

  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(
     {
      puzzleId: eventTarget.dataset.id,
      userId: 1
      }
    )
  }

  // 'load puzzle'
  // render puzzle interface
    // title, 1st clue, clue buttons, timer, submit button, display current coordinates
    // if submitted correctly
      // stop timer
      // de render puzzle interface and toggle interface div
      // update attempt and show a victory page (picture of location?)
        // suggestions - check out the leaderboards or your profile to view stats, or hit the puzzle tab to keep the puzzle train rolling

  fetchDataWithReqObj(attemptsUrl, reqObj)
  .then(attempt => {
    console.log(attempt)

    setTargets(attempt.puzzle.latitude, attempt.puzzle.longitude)
    renderPuzzleName(attempt.puzzle.title)
    renderClues(attempt.clues)
    
    const submitBtn = document.getElementById('submit-btn')
    submitBtn.dataset.attemptId = attempt.id

    console.log(targetLat)
    console.log(targetLong)
  })  
}

const setTargets = (puzzleLat, puzzleLong) => {
  targetLat = puzzleLat
  targetLong = puzzleLong
}

const renderPuzzleName = (title) => {
  const puzzleName = document.getElementById("puzzle-name")
  puzzleName.innerHTML = title
}

const renderClues = (clueArray) => {
  
  const cluesUl = document.getElementById("clues")
  clueArray.forEach(clue => {
    const clueLi = document.createElement("li")
    clueLi.className = "hint"
    clueLi.innerText = clue.hint
    clueLi.id = clue.id
    clueLi.style.display = "none"
    cluesUl.append(clueLi)
  })
  const firstClueLi = document.getElementsByClassName("hint")[0]
  console.log(firstClueLi)
  firstClueLi.style.display = "block"
  console.log(firstClueLi)
}

// const renderButton = () => {
//   const button = document.getElementById("clue-btn")
//   button.innerHTML = `Show Next Hint`
// }

const revealClue = () => {
  console.log("hello world")
  const cluesLiArray = document.getElementsByClassName("hint")

  for (i = 0; i < cluesLiArray.length; i++){
    if (cluesLiArray[i].style.display === "none"){
      return cluesLiArray[i].style.display = 'block'
    }
  }
}

const puzzleCompletion = () => {
  // send updated attempt
  // render victory screen

  const attemptId = parseInt(submitBtn.dataset.attemptId, 10)

  const attemptObj = {
    status: 'completed',
    timeTaken: 10.5
  }

  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(attemptObj)
  }

  fetchDataWithReqObj(attemptsUrl + `/${attemptId}`, reqObj)
  .then(attempt => {
    togglePuzzleInterface
    interfaceDiv.innerHTML = ""
    console.log (attempt)
    // renderSuccess(attempt)
  })
  
}

const renderSuccess = (attempt) => {
  const vMessage = document.createElement('h1')
  vMessage.innerText = 'You Found it!'

  // const locationP = attempt.puzzle.location

}

main()