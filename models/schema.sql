DROP DATABASE IF EXISTS TasteAndSee_db;
CREATE DATABASE TasteAndSee_db;

USE TasteAndSee_db;

CREATE TABLE sylvanas (
    id INT NOT NULL AUTO_INCREMENT,
    sylvana_name VARCHAR(300) NOT NULL,
    sylvana_description VARCHAR(1000),
    sylvana_price DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE cupcakes (
    id INT NOT NULL AUTO_INCREMENT,
    cupcake_name VARCHAR(300) NOT NULL,
    cupcake_description VARCHAR(1000),
    cupcake_price DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE dessertCups (
    id INT NOT NULL AUTO_INCREMENT,
    dessertcup_name VARCHAR(300) NOT NULL,
    dessertcup_description VARCHAR(1000),
    dessertcup_price DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE dripCakes (
    id INT NOT NULL AUTO_INCREMENT,
    dripcake_name VARCHAR(300) NOT NULL,
    dripcake_description VARCHAR(1000),
    dripcake_price DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id)
);
