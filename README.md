# PWA-Budget-Tracker App
## Description

This Budget Tracker app is a progressive web application that lets users add & subtract their funds while online and offline. The main objective of the app is to showcase an example of a Progressive Web App with data persistence. What this means is that this app can be downloaded-able like a native app on desktop and mobile devices that can work outside the browser. It also can keep saving user data locally using the indexedDB browser API when the app is offline, and sync it back up to the MongoDB database when the app comes back online. In our specific case, user can enters a transaction while offline, these transactions are stored in the indexedDB, and transferred to the database when the user comes back online. This all possible by creating a service worker JS script file that sets between our app and network inside the browser. That's why user can get notifications. It’s also important to mention that service workers going to be using promises quite often. Deployed on Heroku: https://pwa-bdg-tracker.herokuapp.com/


## What is a service worker react?

A service worker is a background worker that acts as a programmable proxy, permitting us to control what happens on a request-by-request basis. We can use it to make (parts of, or even entire) apps work offline. A good PWA will be able to run while offline by caching core assets like HTML. CSS, JS, Logos etc. So, you're in control of how much of your user experience is available offline. 
Here's service worker life cycle for your kind perusal, please. 

#### Install
#### Activate
#### Fetch

Note: Make sure that you have "process.env.MONGODB_URI" in your mongoose.connect in the server.js file.

## What is a Manifest.JSON?

The manifest file is a simple text file (JSON file) that lists the resources (app's displayed name, icons, theme color, background color as well as splash screen) the browser should cache for offline access.

## Installation

Install the required dependencies by running “npm install” in your terminal. 
This app assumes there is a MongoDB server running on http://localhost:3004/. If your server is running somewhere else, you can edit server.js to reflect that.

## Usage
Clone the GitHub repo to your local machine or download the code and then open the zipped folder in an IDE. Then run 'npm install' and you will need to create your own file called ‘.env’ to hook it up to your MongoDB. Once that is done you can run 'node server.js' to start the application.
After installing all the dependencies, run 'node server.j in your terminal to start the server.

## Technologies used
ES6, JS, Node.js (Express, Mongoose, compression), MongoDB and PWAs (Web Manifest, Service worker, IndexedDB).

## Screenshots

## User-Story
AS AN avid traveler
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Acceptance-Criteria
GIVEN a budget tracker without an internet connection
WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit
WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated
