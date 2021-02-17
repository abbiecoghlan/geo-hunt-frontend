//nav bar psuedocode - including login but not just login

// home 
    //clear out interface div
    //what interfaces do we want to show?

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

