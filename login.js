//nav bar psuedocode - including login but not just login

// home 
    //clear out interface div
    //what interfaces do we want to show?
    // introduce the program
    // some instructions 

// login
    // clear out interfaceDiv (already a const in index)
    // create buttons for create account or login 
    // create account - sends a fetch (post) request to users and sets that id to a global current user variable
    // login - sends a get reqest to users with a custom route and searchers for the user by the username
        // do something like "if user.try(:authenticate, params[:password])" to search for the user
        //if it logs in, set the id to a global user variable to use for attempts
            // render some sort of successful login message? (what do we want to happen here? puzzle page? profile? home?)
        // if it doesnt, throw an error message 
        // go back and update attempts post request to use the global varible 


const displayLoginForm = () => {
    console.log("you displayed the login form")

    const loginDiv = document.createElement('div')
    loginDiv.className = "text-center"
    
    const loginHeader = document.createElement('h1')
    loginHeader.innerText = "Login"
    loginHeader.className = "text-center"

    const loginForm = document.createElement('form')
    loginForm.className = "text-center"
    loginForm.id = "login-form"


    const usernameLabel = document.createElement('label')
    usernameLabel.innerText = "Username:  "
    const usernameInput = document.createElement('input')
    usernameInput.name = "username"
    usernameInput.type = "text"
    usernameInput.placeholder = "Enter username"

    const newBreak = document.createElement('br')

    const passwordLabel = document.createElement('label')
    passwordLabel.innerText = "Password:  "
    const passwordInput = document.createElement('input')
    passwordInput.name = "password"
    passwordInput.type = "password"
    passwordInput.placeholder = "password"

    const submitButton = document.createElement('button')
    submitButton.id = "submit-btn"
    submitButton.innerHTML = "Submit"
    submitButton.className = "text-center"
    submitButton.type = "submit"

    loginForm.append(loginHeader, usernameLabel, usernameInput, newBreak, passwordLabel, passwordInput, submitButton)
    
    const newAccountHeader = document.createElement('h3')
    newAccountHeader.innerText = "New to Geo Hunt?"
    newAccountHeader.className = "text-center"
    const newAccountButton = document.createElement('button')
    newAccountButton.className = "text-center"
    newAccountButton.id = "new-account-btn"
    newAccountButton.innerText = "Create an account"
    newAccountButton.className = "text-center"

    loginDiv.append(loginForm, newAccountHeader, newAccountButton)   
    interfaceDiv.append(loginDiv)

    addLoginListeners()
}

////////////////////////////////////////////////
// FIX SUBMIT LISTENER WHEN POSSIBLE
///////////////////////////////////////////////
const addLoginListeners = () => {
    const loginForm = document.querySelector('#login-form')
    // const loginButton = document.querySelector('#submit-btn')

    loginForm.addEventListener('submit', event => {
        event.preventDefault()
        console.log('submit button pressed')
        
        const credentials = {
            username: document.querySelector('#login-form').children[2].value,
            password: document.querySelector('#login-form').children[5].value
        }
        // debugger
        const reqObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
              },
            body: JSON.stringify(credentials)
        }

        fetchDataWithReqObj(loginUrl, reqObj)
        .then(user => {
            if (!userId){
                userId = user.id
                username = user.username
                const loginButton = document.querySelector('#login-btn')
                loginButton.innerText = 'Logout'
                loginButton.id = 'logout-btn'
                interfaceDiv.innerHTML = ""
                displayProfile()

            }
            console.table(user)
        })
    })
}



const displayCreateUserForm = (e) => {
    console.log("you want to display a new user form")
}

const loginUser = (e) => {
    console.log("you want to login a user")
}

const logout = () => {
    userId = false
    username = false
    interfaceDiv.innerHTML = ""
    displayHome()
}