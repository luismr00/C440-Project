use `heroku_98deb8cb9687e65`;

CREATE TABLE IF NOT EXISTS user (
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`username`)
);