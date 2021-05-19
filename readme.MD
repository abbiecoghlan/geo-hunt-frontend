# Geo Hunt 🔎
Geo Hunt is an interactive, location-based geography trivia game. Users are given hints to guess a location and use the interactive map, provided by a Google Maps API, to guess and find the location. The application also keeps track of the users game stats through a dynamic leaderboard. 
## ✨ [Watch Demo](https://www.youtube.com/watch?v=YsVwr-I-RNw)

<img width="1168" alt="screengrab of geo hunt app showing a nav bar on top, map on left, and clues and submit button on right" src="https://user-images.githubusercontent.com/66394682/118743381-deffd980-b817-11eb-94d3-30ad0a2837a6.png">

<img width="1166" alt="screengrab of geo hunt app showing a nav bar on top, 'you found it' text, and photo of gateway arch in st.louis" src="https://user-images.githubusercontent.com/66394682/118743396-e9ba6e80-b817-11eb-8c27-cf39704c6265.png">


## 🚀 Technology
Single Page Web Application built with:
- Javascript frontend 
- Rails API backend
- Boostrap CSS
- Google Maps API 

## ⚡️ Installation
This app is working with Ruby 2.6.1, Rails 6.1.2, and Sqlite3 1.4.
- Fork and clone this repository into your local environment.
- Open a terminal and cd into the backend folder.
- Run bundle install in your terminal.
- Run rake db:migrate to migrate the database.
- Run rake db:seed to seed the database.
- Run rails s to run the backend of the program.
- Open a second terminal and cd into the frontend folder.
- Run open index.html to open the website.

## 🌍 Usage
The user will be directed to a home page. There, the user is free to be directed to the Login, Leaderboard, and Puzzle pages via the navigation bar.
- Login or Signup: Here the user can login or sign up to play the game. Once logged in, another option for profile will pop up in the navigation bar and the user will be able to click on the puzzle page.
- Puzzles: This page displays all of the puzzles available to users. The user can click on a puzzle and be redirected to the puzzle page. If the user clicks on a puzzle before being logged in, they will be redirected to the login page.
- Leaderboard: A page that displays the leaderboard for all the users of the game. The user can click on a user in the leaderboard and see their profile. 
- Profile: Here the user is able to see their personal stats and information. When logged in, it will be listed as the current users username. The user can reset their personal stats here.
- Puzzle: The puzzle page is where the game happens. When selecting a location, make sure to click when the five fingered hand appears. You will know you have selected a location when the popup appears. If you think you've found the correct location, press submit to find out if you're correct and win the game! 

## 🤝 Contributors
This project was created utilizing pair programing by the following collaborators: 
- [Abbie Coghlan](https://github.com/abbiecoghlan)
- [Marc Ferraro](https://github.com/marcferraro)
- [Danielle Leppert-Simenauer](https://github.com/dlepperts)
