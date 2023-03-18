CREATE DATABASE stack_overflow;

\c stack_overflow;

CREATE TABLE users (
    id varchar(36) PRIMARY KEY,
    name varchar(190) NOT NULL,
    email varchar(190) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    views int NOT NULL DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE users ADD COLUMN isSent boolean NOT NULL DEFAULT false;
CREATE TABLE questions (
    id varchar(36) PRIMARY KEY,
    title varchar(190) NOT NULL,
    body text NOT NULL,
    tags varchar(500) NOT NULL,
    views int NOT NULL DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id varchar(36) NOT NULL REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX questions_user_id_idx ON questions(user_id);

CREATE TABLE answers (
    id varchar(36) PRIMARY KEY,
    body text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id varchar(36) NOT NULL REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    question_id varchar(36) NOT NULL REFERENCES questions (id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE question_comments (
    id varchar(36) PRIMARY KEY,
    body text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id varchar(36) NOT NULL REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    question_id varchar(36) NOT NULL REFERENCES questions (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE tags (
    id varchar(36) PRIMARY KEY,
    tagname varchar(190) NOT NULL UNIQUE,
    description text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

CREATE TABLE votes (
    id varchar(36) PRIMARY KEY,
    user_id varchar(36) NOT NULL REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    post_id varchar(36) NOT NULL,
    vote_type varchar(10) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

CREATE INDEX votes_post_id_idx ON votes(post_id);
