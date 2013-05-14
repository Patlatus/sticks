delimiter $$

CREATE TABLE `gameusers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `available` int(11) DEFAULT NULL,
  `firstmove` bit(1) DEFAULT NULL,
  `lastactivity` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8$$

delimiter $$

CREATE TABLE `gamemoves` (
  `idgamemoves` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `host` bit(1) DEFAULT NULL,
  `move` int(11) DEFAULT NULL,
  `counter` int(11) DEFAULT NULL,
  PRIMARY KEY (`idgamemoves`),
  UNIQUE KEY `idgamemoves_UNIQUE` (`idgamemoves`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8$$

