-- Configuration de la BDD
PRAGMA foreign_keys = ON;

-- Suppression des anciennes tables
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS category;

-- Création des tables
CREATE TABLE user(id CHAR(7) NOT NULL PRIMARY KEY, firstName VARCHAR(30) NOT NULL, lastName VARCHAR(30) NOT NULL, mail VARCHAR(255),
    admin INTEGER(1) NOT NULL, password VARCHAR(255) NOT NULL, temporaryPassword INTEGER(1) NOT NULL);

CREATE TABLE category(id INTEGER NOT NULL PRIMARY KEY , name VARCHAR(255) NOT NULL);

CREATE TABLE device(ref CHAR(5) NOT NULL PRIMARY KEY, idCategory INTEGER NOT NULL, name VARCHAR(30) NOT NULL, version VARCHAR(15) NOT NULL,
    photo VARCHAR, phone VARCHAR(12),
    FOREIGN KEY (idCategory) REFERENCES category(id));

CREATE TABLE reservation(id INTEGER NOT NULL PRIMARY KEY, refDevice CHAR(5) NOT NULL, idUser CHAR(7) NOT NULL, startDate DATETIME NOT NULL,
    endDate DATETIME, returnDate DATETIME,
    FOREIGN KEY (refDevice) REFERENCES device(ref),
    FOREIGN KEY (idUser) REFERENCES user(id));

-- Insertion
INSERT INTO user VALUES("ABCDEFG", "Lilian", "Bethus", "lilianb@mail.fr", 1,
    "$2a$10$MZfIG15tjZONVVfjsBTj/OCk1epnw7d.nX/ZrZXBDms/uHUDUSY8i", 0); -- Version hachée du mot de passe "fromage"
