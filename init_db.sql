PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS device;

CREATE TABLE device(ref CHAR(5), idCategory INTEGER, name VARCHAR(30), version VARCHAR(15), photo VARCHAR, phone INTEGER(10));

-- A completer

INSERT INTO device VALUES("AN001", 1, "Samsung Galaxy S1000", "1.0", "", 0123456789);