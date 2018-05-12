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

INSERT INTO users (username, firstname, lastname, email, imgurl, password_digest)
  VALUES ('davisgreg1', 'Greg', 'Davis', 'davisgreg1@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test1', 'Test1', 'One', 'davisgreg1@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test2', 'Test2', 'Two', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test3', 'Test3', 'Three', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test4', 'Test4', 'Four', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test5', 'Test5', 'Five', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test6', 'Test6', 'Six', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test7', 'Test7', 'Seven', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test8', 'Test8', 'Eight', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
INSERT INTO users (username, firstname, email, lastname, imgurl, password_digest)
  VALUES ('test9', 'Test9', 'Nine', 'test@gmail.com','https://farrellaudiovideo.com/wp-content/uploads/2016/02/default-profile-pic-300x300.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2');
  
INSERT INTO scores (user_id, points)
  VALUES (1, 100000000);
INSERT INTO scores (user_id, points)
  VALUES (2, 8883);
INSERT INTO scores (user_id, points)
  VALUES (3, 1);
INSERT INTO scores (user_id, points)
  VALUES (4, 536);
INSERT INTO scores (user_id, points)
  VALUES (5, 98);
INSERT INTO scores (user_id, points)
  VALUES (6, 944472);
INSERT INTO scores (user_id, points)
  VALUES (7, 9483);
INSERT INTO scores (user_id, points)
  VALUES (8, 2745);
INSERT INTO scores (user_id, points)
  VALUES (9, 99938);
INSERT INTO scores (user_id, points)
  VALUES (10, 34567);