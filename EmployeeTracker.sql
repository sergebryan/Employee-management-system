DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE EmployeeTracker_db;
USE EmployeeTracker_db;

CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `department` VALUES (1,'IT'),(2,'Electrical'),(3,'HR'),(4,'CIO'),(5,'CDO'),(6,'CSI'),(7,'PAY');

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `role_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
);

INSERT INTO `employee` VALUES (1,'Walter','White',2,NULL);

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `salary` decimal(10,00) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`id`),
);

INSERT INTO `role` VALUES (1,'Senior VP',100000,2),(2,'VP',120000,1),(3,'Senior Director',300000,2);

