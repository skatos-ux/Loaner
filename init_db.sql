PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS reservation;


CREATE TABLE device(ref CHAR(5), idCategory INTEGER, name VARCHAR(30), version VARCHAR(15), photo VARCHAR, phone INTEGER(10));
CREATE TABLE user(id CHAR(7), firstName VARCHAR(30), lastName VARCHAR(15), mail VARCHAR(255), admin INTEGER(1), password VARCHAR(255));
CREATE TABLE category(id INTEGER, name INTEGER);
CREATE TABLE reservation(id INTEGER PRIMARY KEY, refDevice CHAR(5), idUser CHAR(7), startDate DATETIME, endDate DATETIME, returnDate DATETIME);
-- A completer

INSERT INTO device VALUES("AN001", 1, "Samsung Galaxy S1000", "1.0", "", 0123456789);

INSERT INTO user VALUES("0", "Lilian", "Bethus", "lilianb@mail.fr", 1, "fromage");
