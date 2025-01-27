# API-Development  
Jo's API Development Assignment

Link to live site: [PostSite](https://api-development-one.vercel.app/index.html)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Steps](#installation-steps)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## About

This project connects an API to a frontend application using simple GET and POST requests. It allows users to view posts and their comments, as well as submit new comments to a specific post.

## Features

- Built with **HTML**, **CSS**, and **JavaScript** for the frontend.
- The API is built using **Node.js** with **Express.js** for handling server-side requests.
- MySQL is used to manage the database (including posts and comments).
- Allows users to view posts, retrieve post details, and submit comments via the API.
  
## Installation

### Requirements

Before you begin, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/en) (Version 12 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- [MySQL](https://www.mysql.com/) (For local database management)

Additionally, your project will require the following npm packages:

- [express](https://expressjs.com/) (Version 4.21.2 or higher)
- [mysql2](https://www.npmjs.com/package/mysql2) (Version 3.12 or higher)
- [cors](https://www.npmjs.com/package/cors) (Version 2.8.5 or higher)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jovo98/API-Development
   cd API-Development
   
2. **Install dependencies:**
   
   ```bash
   npm install
   
3. **Run the local server:**
   
   ```bash
   npm run dev
   
 
### Requirements
 
- [Node.js](https://nodejs.org/en) (Version 12 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- [cors](https://nodejs.org/en) (Version 2.8.5 or higher)
- [express](https://www.npmjs.com/) (Version 4.21.2 or higher)
- [mysql2](https://www.npmjs.com/) (Version 3.12 or higher)
 

## Usage
 
- Install dependencies by running npm install in your terminal.
- Run the local server by executing npm run dev.
- Open the frontend by navigating to the index.html file in your browser, or use the live demo link above.


## API Endpoints

- GET /users
- GET /user/:id
- POST /post
- GET /post
- GET /post/:id
- POST /post/:id/comment
- GET /comments
  
## License

This project is licensed under the [MIT License.]
 
