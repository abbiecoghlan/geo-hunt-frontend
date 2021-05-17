// "State"
let puzzleInterfaceShowing = false
let userId = false
let username = false

const baseUrl = 'http://localhost:3000'
const puzzlesUrl = 'http://localhost:3000/puzzles'
const attemptsUrl = 'http://localhost:3000/attempts'
const loginUrl = 'http://localhost:3000/login'
const userUrl = 'http://localhost:3000/users'
const profileUrl = 'http://localhost:3000/profile'
const resetUrl = 'http://localhost:3000/reset'

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

    if (event.target.id === 'puzzle-btn'){
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      displayPuzzles()
    }

    if (event.target.id === 'home-btn'){
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      displayHome()
    }

    if (event.target.id === 'login-btn'){
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      displayLoginForm()
    }

    if (event.target.id === 'leaderboard-btn'){
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      displayLeaderboard()
    }

    if (event.target.id === 'profile-btn'){ 
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      displayProfile()
    }

    if (event.target.id === 'logout-btn'){
      interfaceDiv.innerHTML = ""
      puzzleCleanUp()
      logout()
    }
  })
}

const puzzleCleanUp = () => {
  if (puzzleInterfaceShowing){
    stopTimer()
    togglePuzzleInterface()
  }
}

const addPuzzleInterfaceListeners = () => {
  puzzleInterfaceDiv.addEventListener('click', event => { 
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
  puzzleHeader.style = "padding-top: 19px"

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

  cardContainer.append(card)
  card.append(title, span, difficulty)

  // preview images on puzzle tiles (future feature)

  // if (puzzle.preview_image) {
  //   const image = document.createElement('img')
  //   image.setAttribute("src", puzzle.preview_image)
  //   image.setAttribute("width", "200")
  //   image.setAttribute("height", "200")
  //   card.append(image)
  //   }

}


// fetch specfic puzzle utilizing the id stored in the event target, set global targetLat and targetLong
// receive, render initial clue to screen toggling puzzle interface and timer
const loadPuzzle = (eventTarget) => {
  cluesUl.innerHTML = ""
  togglePuzzleInterface()

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

  fetchDataWithReqObj(attemptsUrl, reqObj)
  .then(attempt => { 
    setTargets(attempt.puzzle.latitude, attempt.puzzle.longitude, attempt.puzzle.radius_limit)
    renderPuzzleName(attempt.puzzle.title)
    renderClues(attempt.clues)
    resetTimer()
    startTimer()
    
    const submitBtn = document.getElementById('submit-btn')
    submitBtn.dataset.attemptId = attempt.id
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
  firstClueLi.style.display = "block"
}



const revealClue = () => {
  const cluesLiArray = document.getElementsByClassName("hint")

  for (i = 0; i < cluesLiArray.length; i++){
    if (cluesLiArray[i].style.display === "none"){
      return cluesLiArray[i].style.display = 'block'
    }
  }
}

// send updated attempt, render victory screen
const puzzleCompletion = () => {
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
    renderSuccess(attempt)
  })
  
}

const renderSuccess = (attempt) => {
  const div = document.createElement('div')
  div.className = 'my-4 text-center'
  if (attempt.puzzle.solution_image) {
    const image = document.createElement('img')
    image.setAttribute("src", attempt.puzzle.solution_image)
    image.setAttribute("width", "600")
    image.setAttribute("height", "400")
    image.setAttribute("padding", "40px")
    div.append(image)
    }

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