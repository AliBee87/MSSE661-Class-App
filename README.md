This project is built with **JavaScript using Node Express and tested with Thunder Client** in VS. I used **MongoDB and React** as well.


## Getting Started: Instructions for Running Back End and Front End



# Back End

  In your editor, enter: 
  ```
  git clone https://github.com/AliBee87/MSSE661-Class-App.git
  
  cd MSSE661MongoAPI
  
  npm i
  ```
  

After installing NPM, **_ensure the following packages are installed. If not, use the command npm i with these package names_**:
  ```   
    npm i bcrypt
    npm i cookie-parser
    npm i cors
    npm i date-fns
    npm i dotenv
    npm i express
    npm i jsonwebtoken
    npm i mongoose
    npm i uuid
    npm i chai
    npm i chai-http
    npm i mocha
   ```
    
You'll need to **_create a .env file in the file tree at the root. In it copy and paste the following_**:


    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    DATABASE_URI=mongodb+srv://<username>:<password>@cluster0.ta6fn.mongodb.net/MongoDB?retryWrites=true&w=majority
  
  

    
These will require personal access tokens. To **_create a personal access token,_** write the following commands in your terminal:
  ```
    node
    require('crypto').randomBytes(64).toString('hex')
  ```
Generate, copy and paste each output from these commands to both ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET, excluding the ' ' around the supplied output.


**To get the DATABASE URI**

  - Sign into Mongodb.com
  - Under "Security" select "Database Access"
  - Select "Add New Database User" and keep the Authentication Method at Password
  - Enter user and password, copy, select "Add User"
  - Back in your editor, in the .env, enter the username and password into the Database URI, excluding the carrots
  

**Then, in your terminal, enter npm run dev, and you should be good to go!**




# Front End

In a new editor window, enter: 

```
git clone https://github.com/AliBee87/weeksalmon.git **(for final project. Class final can be found in MSSE661 repo, branch week6)**
```

Then, in your terminal, input 

```
cd weeksalmon
```

Then, enter

```
npm i
```

Ensure the following packages are installed. If not, install the following **packages using npm i:**
```
@fortawesome/fontawesome-svg-core

@fortawesome/free-solid-svg-icons

@fortawesome/react-fontawesome

axios

react-router-dom

```

**Then, to run the Front End, enter npm start in your terminal.** Thanks for checking out my work! 

