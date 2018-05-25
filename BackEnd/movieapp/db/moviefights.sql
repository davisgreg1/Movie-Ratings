DROP DATABASE IF EXISTS moviefights;
CREATE DATABASE moviefights;

\c moviefights;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  imgurl VARCHAR DEFAULT 'v1527033547/default.png',
  firstname VARCHAR,
  lastname VARCHAR,
  blurb VARCHAR,
  email VARCHAR,
  public_id VARCHAR DEFAULT 'default.png',
  date_acct_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  password_digest VARCHAR
);

CREATE TABLE scores (
  user_id INTEGER REFERENCES users(ID),
  points INTEGER DEFAULT 0
);

CREATE TABLE blogs (
  ID SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(ID),
  blog_title VARCHAR,
  blog_body VARCHAR,
  time_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
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

INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('davisgreg1', 'Greg', 'Davis', 'davisgreg1@gmail.com','I like to watch movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test1', 'Test1', 'One', 'davisgreg1@gmail.com','I like to eat movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test2', 'Test2', 'Two', 'test@gmail.com','I like to buy movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test3', 'Test3', 'Three', 'test@gmail.com','I like to sell movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test4', 'Test4', 'Four', 'test@gmail.com','I like to upload movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test5', 'Test5', 'Five', 'test@gmail.com','I like to download movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test6', 'Test6', 'Six', 'test@gmail.com','I like to cry to movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test7', 'Test7', 'Seven', 'test@gmail.com','I like to laugh at movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test8', 'Test8', 'Eight', 'test@gmail.com','I like to sleep while watching movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
INSERT INTO users (username, firstname, lastname, email, blurb, imgurl, password_digest, date_acct_created)
  VALUES ('test9', 'Test9', 'Nine', 'test@gmail.com','I like to poop out movies.','v1527033547/default.png', '$2a$10$Pn5oHAD1s4z1nUqltp.WnuuVjMU0z1Whyun7f/8lgtP9Uqxg1Fkf2', NOW());
  
INSERT INTO scores (user_id, points)
  VALUES (1, 100000000);
INSERT INTO scores (user_id, points)
  VALUES (2, 8880);
INSERT INTO scores (user_id, points)
  VALUES (3, 10);
INSERT INTO scores (user_id, points)
  VALUES (4, 530);
INSERT INTO scores (user_id, points)
  VALUES (5, 980);
INSERT INTO scores (user_id, points)
  VALUES (6, 9444720);
INSERT INTO scores (user_id, points)
  VALUES (7, 94830);
INSERT INTO scores (user_id, points)
  VALUES (8, 27450);
INSERT INTO scores (user_id, points)
  VALUES (9, 999380);
INSERT INTO scores (user_id, points)
  VALUES (10, 345670);

INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (1, 'My First Post', 'This is my first blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (1, 'My Other Post', 'This is my Other blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (2, 'My Second Post', 'This is my 2nd blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (3, 'My Third Post', 'This is my 3rd blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (4, 'My Fourth Post', 'This is my 4th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (5, 'My Fifth Post', 'This is my 5th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (6, 'My Sixth Post', 'This is my 6th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (7, 'My Seventh Post', 'This is my 7th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (8, 'My Eighth Post', 'This is my 8th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (9, 'My Ninth Post', 'This is my 9th blog post', NOW());
INSERT INTO blogs (user_id, blog_title, blog_body, time_posted)
  VALUES (10, 'My Tenth Post', 'This is my 10th blog post', NOW());