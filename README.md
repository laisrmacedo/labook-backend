# Backend Project - Labook

## 📝 Description

User management API, posts and interactions made on the social network Labook. It is an express server back-end application with SQLite3 database, where there is data protection and code organization based on layered architecture concepts.
It aims to promote connection and interaction between people. Those who register in the application will be able to create and like publications.


### DATABASE

![diagramas](./src/assets/projeto-labook.png)
https://dbdiagram.io/d/63d16443296d97641d7c1ae1

## 📜 Documentation

https://documenter.getpostman.com/view/24460805/2s93CRJWGq

## 💻 Installation Instructions

1. Clone the repository.
2. In NPM package manager run:

  ```sh
  npm i
  ```
  
3. Create your own file `file-name.db` on folder `database`.
4. Open the file `labook.sql` and run the table creation commands.
5. Create a file called `.env` in the root of the project to place these environment variables.

  ```sh
  
  #Express Port
  PORT=3003
  #SQLite database file path
  DB_FILE_PATH=./src/database/file-name.db
  #Credentials and secret keys
  JWT_KEY=chose-a-secret-key
  #Token expiration time (exemple: 1 day)
  JWT_EXPIRES_IN=1d
  ```
  
6. Run the server.
  
  ```sh
  npm run dev
  ```
  
## 🕹 Endpoints

- Login 

USERS
- GET All Users;
- POST Create User; 
- DEL Delete User; 

POSTS
- GET All Posts;
- POST Create Post;
- PUT Edit Post;
- DEL Delete Post;
- PUT Like or Dislike.

## 🛠 Technologies

- NodeJS;
- Typescript;
- Express;
- SQLite;
- Knex;
- POO;
- Layered Architecture;
- UUID;
- Hashing Passwords;
- Tokens JWT;
- Authentication and Authorization;
- Routing;
- Postman.

## 👩‍💻 Author

Laís Rodrigues Macedo </br>
📧 laisrodriguesmacedo@gmail.com </br>
📞 (+49) 174 7781517
