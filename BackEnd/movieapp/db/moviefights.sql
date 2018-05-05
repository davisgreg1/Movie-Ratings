DROP DATABASE IF EXISTS moviefights;
CREATE DATABASE moviefights;

\c moviefights;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  imgurl VARCHAR,
  firstname VARCHAR,
  lastname VARCHAR,
  password_digest VARCHAR,
  email VARCHAR
);

CREATE TABLE scores (
  user_id INTEGER REFERENCES users(ID),
  points INTEGER DEFAULT 0
);

CREATE TABLE favorites (
  ID SERIAL PRIMARY KEY,
  movie_imdb_id VARCHAR,
  movie_title VARCHAR,
  movie_imgurl VARCHAR,
  movie_website VARCHAR,
  favorited_by INTEGER REFERENCES users(ID)
);

-- testpass

INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('davisgreg1', 'Greg', 'Davis', 'davisgreg1@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
  
INSERT INTO scores (user_id, points)
  VALUES (1, 100000000);