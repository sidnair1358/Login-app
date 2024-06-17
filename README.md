# Login App

The app is a monorepo separated into frontend and backend directories. The backend is a node app with express and a postgres database. The frontend is React with Redux for state management.

##### Setup

###### Backend

1. Add a .env file with the following variables in the root of the backend directory:
   ##DB
   DB_HOST=localhost
   DB_USER=admin
   DB_PASSWORD=supersecretpassword
   DB_NAME=userDb
   DB_PORT=5432
   SERVER_PORT=8080
   ##Encryption
   SALT=10
2. Run npm install
3. From the backend root directory run ./start.sh. This would spin up a postgres docker container, mount a volume to it to persist the data locally and start the server. (You would need to have docker installed and pull the postgres image)

###### Frontend

1. Add a .env file with the following variables in the root of the frontend directory:
   ##API URL
   REACT_APP_API_URL=http://localhost:8080/
2. Run npm install
3. Run npm start

##### App Functionality (Backend)

1. The backend is quite simple but it covers the requirements on the spec. It has two post request for registering and logging in. It has a get request to get all the users in the database. The get request is used by the frontend on the homepage, to display all the users added to the DB to visually represent what's happening in the backend.
2. All requests send appropriate errors and statuses e.g. a user who already has an account cannot register again and we get a status 409 and an error message saying the user is already registered. A user is not allowed to register or log in without filling in all fields. A user who is not registered is not allowed to log in. A user with the wrong password is not allowed to log in.
3. Basic password encryption has been implemented using the bcrypt library during sign up. A password check is done while logging in using the same library. The password is hashed, a salt generated and added to the hashed password.
4. Added some basic unit tests for api routes.

##### App Functionality (Fronend)

1. There are three routes set up - Register, Login and Home page.
2. Redux used for state management as per spec.
3. I've used Formik and Yup for form validation. It checks for valid emails and if the password and confirm password values match. Passwords need to be at least 6 characters long. This is quite basic and validation can be improved. I kept this simple with a view of getting an MVP ready.
4. The Login page sends a request to the API to check if a user exists in the database. If the user doesn't exist an error message is displayed. If successfull, the user is taken to the homepage where the user is greeted and the list of all users in the database is displayed in a tabular form. There is a link to logout which redirects the user to the login page.
5. CSS transitions have been used on all components to allow for smooth transition between pages. The design is clean and minimal allowing for easy navigation.
6. I have used a few react-bootstrap components to style the homepage.
7. Error states are cleared between pages.

###### Stretch goals

1. Responsive pages
2. Implement JWT
