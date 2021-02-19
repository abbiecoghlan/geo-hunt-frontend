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
    loginDiv.id = 'login-div'
    
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
    newAccountButton.innerText = "Sign Up"
    newAccountButton.className = "text-center"

    loginDiv.append(loginForm, newAccountHeader, newAccountButton)   
    interfaceDiv.append(loginDiv)

    addLoginListeners()
}
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
                const profileButton = document.getElementById('profile-btn')
                profileButton.style.display = ""
                profileButton.innerText = user.username
                displayProfile()

            }
        })
    })

    const newAccountButton = document.getElementById('new-account-btn')

    newAccountButton.addEventListener('click', event => {
        event.preventDefault()
        displayCreateUserForm()
    })
}



const displayCreateUserForm = (e) => {
    console.log("you want to display a new user form")
    interfaceDiv.innerHTML = 
    `
    <div>
        <form id="new-form">
            <h1 class="text-center">Sign Up</h1>
            <div style="margin-left: 40%;">
                <label>Name:  </label>
                <input id="name" name="name" type="text" placeholder="Enter name">
                <br>
                <label>Username:  </label>
                <input id="username" name="username" type="text" placeholder="Enter username">
                <br>
                <label>Password:  </label>
                <input id="password" name="password" type="password" placeholder="password">
                <br>
                <label>Confirm:  </label>
                <input id="password-confirm" name="confirm-password" type="password" placeholder="confirm-password">
                <br>
                <button id="submit-btn" style="margin-left: 13%" type="submit">Submit</button>
            </div>
        </form>
        <div class="text-center" id="confirm-message" style="display: none">
            Passwords do not match and must have name and username
        </div>
    </div>
    `

    addCreateAccountListener()
}

// const loginUser = (e) => {
//     console.log("you want to login a user")
// }

const addCreateAccountListener = () => {
    const newForm = document.querySelector('#new-form')
    // const loginButton = document.querySelector('#submit-btn')

    newForm.addEventListener('submit', event => {
        event.preventDefault()
        if (document.querySelector('#password').value === document.querySelector('#password-confirm').value && document.querySelector('#username').value && document.querySelector('#name').value){
            console.log('submit button pressed')
            
            const credentials = {
                name: document.querySelector('#name').value,
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            }

            const reqObj = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                },
                body: JSON.stringify(credentials)
            }

            fetchDataWithReqObj(userUrl, reqObj)
            .then(user => {
                if (!userId){
                    userId = user.id
                    username = user.username
                    const loginButton = document.querySelector('#login-btn')
                    loginButton.innerText = 'Logout'
                    loginButton.id = 'logout-btn'
                    interfaceDiv.innerHTML = ""
                    const profileButton = document.getElementById('profile-btn')
                    profileButton.style.display = ""
                    profileButton.innerText = user.username
                    displayProfile()
                }
            })
        } else {
            const message = document.getElementById('confirm-message')
            message.style.display = ""
            setTimeout(() => {
                message.style.display = "none"
            }, 4000)
        }
    })
}

const logout = () => {
    userId = false
    username = false
    const profileButton = document.getElementById('profile-btn')
    profileButton.style.display = "none"
    profileButton.innerText = "Profile"
    interfaceDiv.innerHTML = ""

    const loginButton = document.querySelector('#logout-btn')
    loginButton.innerText = 'Login'
    loginButton.id = 'login-btn'
    
    displayHome()
}