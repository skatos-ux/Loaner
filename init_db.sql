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
INSERT INTO category VALUES(1, "Téléphones");
INSERT INTO category VALUES(2, "Ordinateurs");
INSERT INTO category VALUES(3, "Tablettes");

INSERT INTO device VALUES("AN001", 1, "Samsung Galaxy S1000", "1.0", "https://media.ldlc.com/r1600/ld/products/00/05/30/35/LD0005303584_2.jpg",
    "0123456789");
INSERT INTO device VALUES("AN002", 1, "Huawei P80", "1.1", "https://media.ldlc.com/r1600/ld/products/00/05/39/99/LD0005399909_2.jpg",
    "1234567890");

INSERT INTO device VALUES("PC001", 2, "Acer Pro Max", "1.0",
    "https://static.acer.com/up/Resource/Acer/Laptops/Spin_5/Image/20180824/acer-Spin_5_SP513-53N-main.png", "");

INSERT INTO user VALUES("ABCDEFG", "Lilian", "Bethus", "lilianb@mail.fr", 1,
    "$2a$10$MZfIG15tjZONVVfjsBTj/OCk1epnw7d.nX/ZrZXBDms/uHUDUSY8i", 0); -- Version hachée du mot de passe "fromage"
INSERT INTO user VALUES("HIJKLMN", "Milan", "Pasquereau", "mpsqr@mail.fr", 0,
    "$2a$10$6Id/sE6Ocg8/iV9I75NGxupqxirjMCpZ7Q0tWTI/6VAcr.fP2WBmi", 0); -- Version hachée du mot de passe "bourbe"

INSERT INTO reservation VALUES(1, "AN001", "HIJKLMN", "2021-01-05", "2021-01-08", NULL);
INSERT INTO reservation VALUES(2, "PC001", "ABCDEFG", "2021-01-04", "2021-01-12", "2021-02-04");
INSERT INTO reservation VALUES(3, "AN001", "HIJKLMN", "2021-01-07", "2021-02-08", NULL);
