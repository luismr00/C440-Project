use `COMP440`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`username`)
);