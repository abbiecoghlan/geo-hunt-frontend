GEO HUNT

Welcome to GEO HUNT!

This project was created by three students attending Flatiron School's software engineering immersive as their module three project. 

****

GEO HUNT is an interactive geography game. Users are given hints to guess a location. The user uses the interactive map, provided by a Google Maps API, to guess the location. Meanwhile the app keeps track of the users game stats through an dynamic leaderboard. 

****

MODEL
The user in our application is the game player. 

USERS
Our application utilizes the following models:
User: A user has many attempts and has many puzzles through attempts.
Attempt: An attempt belongs to a user and to a puzzle.
Puzzle: A puzzle has many attempts and has many users through attempts, and has many clues.
Clue: A clue belongs to a puzzle.

****

INSTRUCTIONS FOR LAUNCHING THE APP
This app is working with Ruby 2.6.1, Rails 6.1.2, and Sqlite3 1.4.
Fork and clone this repository into your local environment.
Open a terminal and cd into the backend folder.
Run bundle install in your terminal.
Run rake db:migrate to migrate the database.
Run rake db:seed to seed the database.
Run rails s to run the backend of the program.
Open a second terminal and cd into the frontend folder.
Run open index.html to open the website.

*****

INSTRUCTIONS FOR NAVIGATING GEO HUNT
The user will be directed to a home page. There, the user is free to be directed to the Login, Leaderboard, and Puzzle pages via the navigation bar.
Login: Here the user can login or sign up to play the game. Once logged in, another option for profile will pop up in the navigation bar and the user will be able to click on the puzzle page.
Puzzles: This page displays all of the puzzles available to users. The user can click on a puzzle and be redirected to the puzzle page. If the user clicks on a puzzle before being logged in, they will be redirected to the login page.
Leaderboard: A page that displays the leaderboard for all the users of the game. The user can click on a user in the leaderboard and see their profile. 
Profile: Here the user is able to see their personal stats and information. When logged in, it will be listed as the current users username. The user can reset their personal stats here.
Puzzle: The puzzle page is where the game happens. When selecting a location, make sure to click when the five fingered hand appears. You will know you have selected a location when the popup appears.


Contributors
Abbie Coghlan, Marc Ferraro, and Danielle Leppert-Simenauer