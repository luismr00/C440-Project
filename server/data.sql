use `COMP440`; 

SET FOREIGN_KEY_CHECKS = 0;

-- DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `comment` text NOT NULL,
    `date` datetime NOT NULL,
    `username` varchar(255) NOT NULL,
    `blog_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`username`) REFERENCES user(`username`),
    FOREIGN KEY (`blog_id`) REFERENCES blog(`id`)
);

-- DROP TABLE IF EXISTS `blog`;
CREATE TABLE IF NOT EXISTS `blog` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `subject` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `tags` varchar(20) NOT NULL,
    `date` datetime NOT NULL,
    `user_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`username`)
);

-- DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `rating` int(1) NOT NULL,
    `blog_id` int(11) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`blog_id`) REFERENCES blog(`id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`username`)
);

-- DROP TABLE IF EXISTS `hobby`;
CREATE TABLE IF NOT EXISTS `hobby` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `hobby` varchar(255) NOT NULL,
    `user_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user(`username`)
);

-- DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `follower_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`username`),
  FOREIGN KEY (`follower_id`) REFERENCES user(`username`)
);

CREATE TABLE IF NOT EXISTS `hobbies_list` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `hobby` text NOT NULL,
    PRIMARY KEY (`id`)
);

SET FOREIGN_KEY_CHECKS = 1;