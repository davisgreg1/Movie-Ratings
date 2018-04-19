DROP DATABASE IF EXISTS moviefights;
CREATE DATABASE moviefights;

\c moviefights;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password_digest VARCHAR
);

CREATE TABLE scores (
  user_id INTEGER REFERENCES users(ID),
  points INTEGER DEFAULT 0
);

CREATE TABLE favorites (
  movie_id VARCHAR,
  movie_title VARCHAR,
  favorited_by INTEGER REFERENCES users(ID)
);


INSERT INTO users (username, password_digest)
  VALUES ('davisgreg1', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq')
  
INSERT INTO scores (user_id, points)
  VALUES (1, 1000000000)