CREATE DATABASE Adoppet;
USE Adoppet;
CREATE TABLE Person (PersonID INT PRIMARY KEY AUTO_INCREMENT, PersonName VARCHAR(32) NOT NULL, Password VARCHAR(120) NOT NULL,PersonEmail VARCHAR(32) NOT NULL, PersonPhoneNumber VARCHAR(16) NOT NULL); 

INSERT INTO Person VALUES (null, 'Cristopher Chicaiza','sfNIOdYJsobbAWYI5Zqd+w==', 'cjchicaiza2@espe.edu.ec', '0992822332');

CREATE TABLE bulletin (
	idBulletin INT NOT NULL AUTO_INCREMENT,
	bulletinName VARCHAR(32),
	idPersonBulletin INT,
	idPetBulletin INT,
	bulletinDescription VARCHAR(64),
	bulletinType VARCHAR(32),
	PRIMARY KEY (idBulletin)
);
INSERT INTO bulletin VALUES(1,"Perrito Blanco Norte de Quito", 1,1,"Llevaba un collar rojo","LostPet");
INSERT INTO bulletin VALUES(2,"Perro Negro Sur de Quito", 2,2,"Tiene una mancha blanca","LostPet");
INSERT INTO bulletin VALUES(3,"Perro Gris Centro de Quito", 3,3,"Tiene una mancha de corazon en el cuerpo","LostPet");
INSERT INTO bulletin VALUES(4,"Gato Naranja Perdido Cumbaya", 4,4,"Se encontraba con un sueter navideno","LostPet");
INSERT INTO bulletin VALUES(5,"Gato Blanco Perdido Carolina", 5,5,"Tiene un ojo verde y otro azul","LostPet");
INSERT INTO bulletin VALUES(6,"Gato Blanco En Adopcion Quito", 6,6,"Hermoso gato blanco en adopción, tiene vacunas y usa el arenero","PetAdoption");
INSERT INTO bulletin VALUES(7,"Perro En Adopcion Quito", 7,7,"Perrito cariñoso en adopcion, busca una familia atenta","PetAdoption");
INSERT INTO bulletin VALUES(8,"Gata bebe En Adopcion Cuenca", 8,8,"Gatita bebe de 5 meses en adopcion, usa el arenero","PetAdoption");
INSERT INTO bulletin VALUES(9,"Gato adulta Adopcion Guayaquil", 9,9,"Usa el arenero y es muy carinosa","PetAdoption");
INSERT INTO bulletin VALUES(10,"Cachorro en Adopcion Guayaquil",10,10,"Tiene apenas 1 año de edad es muy cariñoso, ","PetAdoption");

create table pet(
    idPet int not null auto_increment primary key,
    namePet varchar(16),
    racePet varchar(16),
    colorPet varchar(16),
    typePet varchar(16),
    statusPet varchar(16),
    descriptionPet varchar(64)
);

insert into pet value(null,"gary","persa","cafe","cat","lost","gato grande");
insert into pet value(null,"henry","boyero","negro","dog","found","perro grande");
insert into pet value(null,"Alex","persa","cafe","cat","lost","gato pequeño");
insert into pet value(null,"beto","boyero","negro","dog","found","perro negro enfermo");
insert into pet value(null,"michu","persa","cafe","cat","lost","gato chicquito");
insert into pet value(null,"fany","boyero","cafe","dog","found","perro cafe");
insert into pet value(null,"lorey","persa","cafe","cat","lost","gato grande");
insert into pet value(null,"piroslo","boyero","negro","dog","found","perro grande");
insert into pet value(null,"michu","persa","cafe","cat","lost","gato grande");
insert into pet value(null,"tobi","boyero","negro","dog","found","perro grande"); 

create table lostPet (
    idLostPet int auto_increment primary key,
    idPetLostPet int,
    lostFlagLostPet varchar(4),
    lostPetPlace varchar(64)
);

insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (1, "Yes", "Teleferico");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (2, "Yes", "Basilica");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (3, "No", "La Ronda");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (4, "Yes", "Itchimbia");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (5, "Yes", "Mitad del Mundo");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (6, "No", "Iglesia San Franciso");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (7, "Yes", "Palacio Carondelet");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (8, "Yes", "Panecillo");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (9, "No", "Floresta");
insert into lostPet (idPetLostPet, lostFlagLostPet, lostPetPlace) values (10, "Yes", "Carolina");
