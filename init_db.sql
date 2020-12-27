-- Configuration de la BDD
PRAGMA foreign_keys = ON;

-- Suppression des anciennes tables
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS category;

-- Création des tables
CREATE TABLE user(id CHAR(7) PRIMARY KEY, firstName VARCHAR(30), lastName VARCHAR(15), mail VARCHAR(255), admin INTEGER(1), password VARCHAR(255));
CREATE TABLE category(id INTEGER PRIMARY KEY , name VARCHAR(255));
CREATE TABLE device(ref CHAR(5) PRIMARY KEY, idCategory INTEGER, name VARCHAR(30), version VARCHAR(15), photo VARCHAR, phone VARCHAR(12),
    FOREIGN KEY (idCategory) REFERENCES category(id));
CREATE TABLE reservation(id INTEGER PRIMARY KEY, refDevice CHAR(5), idUser CHAR(7), startDate DATETIME, endDate DATETIME, returnDate DATETIME,
    FOREIGN KEY (refDevice) REFERENCES device(ref),
    FOREIGN KEY (idUser) REFERENCES user(id));

-- Insertion
INSERT INTO category VALUES(1, "Test");

INSERT INTO device VALUES("AN001", 1, "Samsung Galaxy S1000", "1.0", "", "0123456789");

INSERT INTO user VALUES("0", "Lilian", "Bethus", "lilianb@mail.fr", 1,
    "$2a$10$MZfIG15tjZONVVfjsBTj/OCk1epnw7d.nX/ZrZXBDms/uHUDUSY8i"); -- Version hachée du mot de passe "fromage"
