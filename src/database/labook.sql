-- Active: 1675542264253@@127.0.0.1@3306

-- table users
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);
INSERT INTO users (id, name, email, password, role, created_at)
VALUES ("test","test", "test@test.test","test","test","test");

SELECT * FROM users;
DROP TABLE users;

CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);

INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES ("test","test","test", 0, 0,"test","test");

SELECT * FROM posts;

DROP TABLE posts;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
  FOREIGN KEY (post_id) REFERENCES posts(id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE 
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ("test","test", 1);

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;