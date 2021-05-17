const displayLoginForm = () => {
    const loginDiv = document.createElement('div')
    loginDiv.className = "text-center"
    loginDiv.id = 'login-div'
    
    const loginHeader = document.createElement('h1')
    loginHeader.innerText = "Login"
    loginHeader.className = "text-center my-3"

    const loginForm = document.createElement('form')
    loginForm.className = "text-center"
    loginForm.id = "login-form"


    const usernameLabel = document.createElement('label')
    usernameLabel.innerText = "Username:  "
    const usernameInput = document.createElement('input')
    usernameInput.name = "username"
    usernameInput.type = "text"
    usernameInput.placeholder = "Enter Username"

    const newBreak = document.createElement('br')

    const passwordLabel = document.createElement('label')
    passwordLabel.innerText = "Password:  "
    const passwordInput = document.createElement('input')
    passwordInput.name = "password"
    passwordInput.type = "password"
    passwordInput.placeholder = "Enter Password"

    const newNewBreak = document.createElement('br')

    const submitButton = document.createElement('button')
    submitButton.id = "submit-btn"
    submitButton.innerHTML = "Login"
    submitButton.className = "btn btn-primary align-bottom btn-sm mr-1"
    submitButton.type = "submit"

    loginForm.append(loginHeader, usernameLabel, usernameInput, newBreak, passwordLabel, passwordInput, newNewBreak, submitButton)
    
    const newAccountHeader = document.createElement('h3')
    newAccountHeader.innerText = "New to Geo Hunt?"
    newAccountHeader.className = "text-center my-2"
    const newAccountButton = document.createElement('button')
    newAccountButton.className = "btn btn-primary align-bottom btn-sm mr-1"
    newAccountButton.id = "new-account-btn"
    newAccountButton.innerText = "Sign Up"

    loginDiv.append(loginForm, newAccountHeader, newAccountButton)   
    interfaceDiv.append(loginDiv)

    addLoginListeners()
}
const addLoginListeners = () => {
    const loginForm = document.querySelector('#login-form')

    loginForm.addEventListener('submit', event => {
        event.preventDefault()       
        const credentials = {
            username: document.querySelector('#login-form').children[2].value,
            password: document.querySelector('#login-form').children[5].value
        }

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
        }).catch(()=>
        {alert("Incorrect username or password, please try again.")}
        )
    })

    const newAccountButton = document.getElementById('new-account-btn')

    newAccountButton.addEventListener('click', event => {
        displayCreateUserForm()
    })
}


const displayCreateUserForm = (e) => {
    interfaceDiv.innerHTML = 
    `
    <div>
        <form id="new-form">
            <h1 class="text-center">Sign Up</h1>
            <div class="text-center" >
                <label>Name:  </label>
                <input id="name" name="name" type="text" placeholder="Enter Name">
                <br>
                <label>Username:  </label>
                <input id="username" name="username" type="text" placeholder="Enter Username">
                <br>
                <label>Password:  </label>
                <input id="password" name="password" type="password" placeholder="Enter Password">
                <br>
                <label>Confirm:  </label>
                <input id="password-confirm" name="confirm-password" type="password" placeholder="Confirm Password">
                <br>
                <button id="submit-btn" class="btn btn-primary align-bottom btn-sm mr-1" type="submit">Submit</button>
            </div>
        </form>
        <div class="text-center" id="confirm-message" style="display: none">
            Passwords do not match and must have name and username
        </div>
    </div>
    `
    addCreateAccountListener()
}



const addCreateAccountListener = () => {
    const newForm = document.querySelector('#new-form')

    newForm.addEventListener('submit', event => {
        event.preventDefault()
        if (document.querySelector('#password').value === document.querySelector('#password-confirm').value && document.querySelector('#username').value && document.querySelector('#name').value){            
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