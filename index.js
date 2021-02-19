let puzzleInterfaceShowing = false
let userId = false
let username = false

const baseUrl = 'http://localhost:3000'
const puzzlesUrl = 'http://localhost:3000/puzzles'
const attemptsUrl = 'http://localhost:3000/attempts'
const loginUrl = 'http://localhost:3000/login'
const userUrl = 'http://localhost:3000/users'
const profileUrl = 'http://localhost:3000/profile'


const puzzleInterfaceDiv = document.getElementById('puzzle-interface')
const interfaceDiv = document.getElementById('interface')
const submitBtn = document.getElementById('submit-btn')
const cluesUl =  document.getElementById("clues")


const main = () => {
  displayHome()
  addNavListeners()
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
      puzzleVibeCheck()
      displayPuzzles()
    }

    if (event.target.id === 'home-btn'){
      console.log('you pushed the home button')
      interfaceDiv.innerHTML = ""
      puzzleVibeCheck()
      displayHome()
    }

    if (event.target.id === 'login-btn'){
      console.log('you pushed the login button')
      interfaceDiv.innerHTML = ""
      puzzleVibeCheck()
      displayLoginForm()
    }

    if (event.target.id === 'leaderboard-btn'){
      console.log('you pushed the leaderboard button')
      interfaceDiv.innerHTML = ""
      puzzleVibeCheck()
      displayLeaderboard()
    }

    if (event.target.id === 'profile-btn'){
      console.log('you pushed the profile button')
      interfaceDiv.innerHTML = ""
      puzzleVibeCheck()
      displayProfile()
    }

    if (event.target.id === 'logout-btn'){
      console.log('you pushed the logout button')
      interfaceDiv.innerHTML = ""
      puzzleVibeCheck()
      logout()
    }
  })
}

const puzzleVibeCheck = () => {
  if (puzzleInterfaceShowing){
    stopTimer()
    togglePuzzleInterface()
  }
}

const addPuzzleInterfaceListeners = () => {

  puzzleInterfaceDiv.addEventListener('click', event => { 
    event.preventDefault()

    if (event.target.id === 'clue-btn'){
      revealClue()
    }

    if (event.target.id === 'submit-btn'){
      verify(targetLat, targetLong, currentLat, currentLong, radiusLimit)
    }

  })
}

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

  const puzzleDiv = document.createElement('div')

  puzzleDiv.addEventListener('click', event => {
    event.preventDefault()

    if (event.target.id === 'puzzle-select' && userId){
      loadPuzzle(event.target)
    } else if (event.target.id === 'puzzle-select' && !userId) {
      interfaceDiv.innerHTML = ""
      displayLoginForm()
    }
  })


  const cardContainer = document.createElement('div')
  cardContainer.className = 'text-center'
  const puzzleHeader = document.createElement('h2')
  puzzleHeader.innerText = 'Browse Puzzles'
  puzzleHeader.className = 'text-center'


  puzzleDiv.append(puzzleHeader, cardContainer)
  interfaceDiv.append(puzzleDiv)

  fetchData(puzzlesUrl)
  .then(puzzles => puzzles.forEach(puzzle => renderPuzzleLi(puzzle, cardContainer))
  )
}

const renderPuzzleLi = (puzzle, cardContainer) => {

  const card = document.createElement('div')
  card.className = 'card text-center'

  const title = document.createElement('h4')
  title.innerText = `${puzzle.title}`

  const span = document.createElement('span')
  span.class = "text-center"
  
  const button = document.createElement('button')
  button.id = 'puzzle-select'
  button.dataset.id = puzzle.id
  button.innerText = 'Start'
  button.className = "btn btn-primary mr-1 start-btn"
  
  span.append(button)

  const difficulty = document.createElement('p')
  difficulty.innerText = capitalize(puzzle.difficulty)

  // completion percentage
  // highest rated
  // most played
  // add difficulty categorizer/sections

  cardContainer.append(card)
  card.append(title, span, difficulty)
}

const loadPuzzle = (eventTarget) => {
  cluesUl.innerHTML = ""
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
      userId: userId
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
  
    setTargets(attempt.puzzle.latitude, attempt.puzzle.longitude, attempt.puzzle.radius_limit)
    renderPuzzleName(attempt.puzzle.title)
    renderClues(attempt.clues)
    resetTimer()
    startTimer()
    
    const submitBtn = document.getElementById('submit-btn')
    submitBtn.dataset.attemptId = attempt.id

    console.log(targetLat)
    console.log(targetLong)
  })  
}

const setTargets = (puzzleLat, puzzleLong, rLimit) => {
  targetLat = puzzleLat
  targetLong = puzzleLong
  radiusLimit = rLimit
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
  stopTimer()
  const attemptId = parseInt(submitBtn.dataset.attemptId, 10)
  const stopwatch = document.getElementById('stopwatch').innerText

  const attemptObj = {
    status: 'Completed',
    timeTaken: stopwatch
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
    togglePuzzleInterface()
    interfaceDiv.innerHTML = ""
    console.log (attempt)
    renderSuccess(attempt)
  })
  
}

const renderSuccess = (attempt) => {
  const div = document.createElement('div')
  div.className = 'text-center'

  const vMessage = document.createElement('h1')
  vMessage.innerText = 'You Found it!'

  const locationP = document.createElement('p')
  locationP.innerText = `Location: ${attempt.puzzle.location_name}`

  const timeP = document.createElement('p')
  timeP.innerText = `Time Taken: ${attempt.time_taken}`

  div.append(vMessage, locationP, timeP)
  interfaceDiv.append(div)

}

const capitalize = (string) => {
  const lower = string.toLowerCase()
  return string.charAt(0).toUpperCase() + lower.slice(1)
}

main()