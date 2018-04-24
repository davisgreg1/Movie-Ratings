DROP DATABASE IF EXISTS moviefights;
CREATE DATABASE moviefights;

\c moviefights;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  imgurl VARCHAR,
  firstname VARCHAR,
  lastname VARCHAR,
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


INSERT INTO users (username, firstname, lastname, imgurl, password_digest)
  VALUES ('davisgreg1', 'Greg', 'Davis', 'https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$TLqr9r5zNWt4QkUsn..5cOSkyRM65GayN5g9AtRMbxyARxymjBR62');
  
INSERT INTO scores (user_id, points)
  VALUES (1, 100000000);