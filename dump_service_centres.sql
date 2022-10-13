-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: service_centres
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Audi'),(2,'Bentley'),(3,'BMW'),(4,'Ford'),(5,'Hyundai'),(6,'Kia'),(7,'Lada'),(8,'Mercedes'),(9,'Mitsibishi'),(10,'Nissan');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mileage` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `model` varchar(20) NOT NULL,
  `country_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `year_manifacture` year(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  KEY `brand_id` (`brand_id`),
  KEY `client_id` (`client_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `car_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `car_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE,
  CONSTRAINT `car_ibfk_4` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,120000,'111112',3,'x9',2,4,2021),(2,10001000,'121a12',1,'a3',1,2,2005),(3,10101000,'1123a12',2,'d1',1,3,2002),(4,10101100,'1123a13',3,'e2',2,4,2012),(5,10141100,'1123a14',4,'d4',3,5,2013),(6,10141105,'1123a15',5,'re2',4,6,2014),(7,10141165,'1123a16',6,'rx2',5,7,2011),(8,12141165,'1223a16',7,'rq2',6,8,2011),(11,12141167,'1129a16',8,'rw2',7,10,2010),(12,12149167,'1129a17',9,'qw2',9,11,2010),(13,12149167,'1929a17',10,'qw2',10,9,2010),(14,1,'1',1,'1',1,1,2001),(16,1,'2',1,'1',1,1,2001),(17,1,'3',1,'1',1,1,2001),(18,1,'12',1,'1',1,1,2001),(19,10000,'qw123q',3,'x5',1,4,2020),(20,12000,'as123d',3,'w2',1,4,2001),(22,12,'123',3,'12',1,4,2001),(23,12,'1234',3,'1212',1,4,2002),(24,12,'zx123z',3,'wq',1,4,2001),(25,12,'vb123v',1,'a2',2,4,2001),(26,123345,'qaz12q',1,'a6',2,4,2001),(27,123,'456123',1,'a2',2,4,2012),(28,12,'125465',3,'12',1,4,2001),(29,12,'qw90q',3,'x5',2,4,2001),(30,12312,'qw121y',3,'1',1,27,2001),(31,12312,'qz12zx',3,'1',2,28,2001),(32,1,'nm121n',3,'1',1,28,2001),(33,1,'er123e',3,'1',1,28,2003);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  `country_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Vienna',1),(2,'Tirana',2),(3,'Andorra-la-Vella',3),(4,'Brusells',4),(5,'Minsk',5),(6,'Sofia',6),(7,'Sarajevo',7),(8,'Vatican',8),(9,'London',9),(10,'Budapest',10),(11,'Moscow',11),(12,'Taganrog',11);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `surname` varchar(25) DEFAULT NULL,
  `passport` varchar(10) NOT NULL,
  `password` varchar(128) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `passport` (`passport`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Ivan','Ivanov','41411','iopqweq',''),(2,'Petr','Petrov','123123','',''),(3,'Daniil','Danilov','121113','',''),(4,'Dmitry','Dimonov','987123','',''),(5,'Kirill','Kirillov','123412','',''),(6,'Sanya','Loh','657481','',''),(7,'Nikita','Loshok','412453','',''),(8,'Cristiano','Ronaldo','120912','',''),(9,'Abbuju','Pipuou','917124','',''),(10,'Abbubu','Pipupu','987124','',''),(11,'Adaoi','Peprap','927124','',''),(12,'1','1','1','1',''),(13,'Dima','Vikulin','121212','fkme420',''),(14,'Sanya','Butenko','123789','qwerty',''),(15,'Hor','Horov','898989','asadfgh',''),(16,'Jira','Jirov','787878','iopqwe',''),(17,'Guru','Guriv','789123','bril',''),(18,'Sisi','Sisev','456456','123',''),(19,'Fifa','Fifiv','121210','qwasqqq',''),(20,'Fufa','Fufov','129090','sadkas',''),(21,'Didi','Didov','120901','12qw',''),(22,'Kiki','Kikov','656565','vklss',''),(23,'Hitu','Hirov','757675','asjsas',''),(24,'Alisa','Balackaya','123091','asdpoq','abalatskaya@lachestry.com'),(27,'Dimas','Dimasov','89898','qwerty','dima@mail.ru'),(28,'Alsia','Balatckaya','90190','zxcqwe','alisa@mail.ru'),(29,'Sanya','Sankov','901290','$2b$10$9sdHSHPUQZj9aelRkXecQuKITF1EIAa6NhGAUBhIHjx54euTR4B/e','sanya@mail.ri'),(30,'Nikita','Nikitov','128919','$2b$10$9n16Z50M/tHimFHAjnsEBOXcBWBxZQqybjW9NkRieVImt5D3RpWie','nikita@mail.ru'),(31,'Kirikk','Kirillov','111000','$2b$10$NoxMcokYGJ0gvkfE90nz/O3t2n6tfPa5AhXAkpcGe8g6lkIXLi92G','kirill@mail.ru'),(32,'Biba','Bibov','156328','$2b$10$N6PfjrYE8.nJQmqueLXWAuR3GfHzgzIeFIPfFT.Lbqpk2M3PVEcde','biba@mail.ru');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (2,'Albania'),(3,'Andorra'),(1,'Austria'),(5,'Belarus'),(4,'Belgium'),(7,'Bosnia'),(6,'Bulgaria'),(10,'Hungary'),(11,'Russhia'),(9,'UK'),(8,'Vatican');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master`
--

DROP TABLE IF EXISTS `master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `surname` varchar(15) NOT NULL,
  `head_master_id` int(11) DEFAULT NULL,
  `service_center_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `head_master_id` (`head_master_id`),
  KEY `service_center_id` (`service_center_id`),
  CONSTRAINT `master_ibfk_1` FOREIGN KEY (`head_master_id`) REFERENCES `master` (`id`),
  CONSTRAINT `master_ibfk_2` FOREIGN KEY (`service_center_id`) REFERENCES `service_center` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master`
--

LOCK TABLES `master` WRITE;
/*!40000 ALTER TABLE `master` DISABLE KEYS */;
INSERT INTO `master` VALUES (1,'Dima','Dimonov',1,1),(2,'Juja','Prikol',1,1),(3,'Guga','Franchsko',2,1),(4,'Naruto','Uzumaki',3,2),(5,'Ichigo','Kurosaki',3,2),(6,'Edward','Elric',5,3),(7,'Hideo','Kadzima',6,3),(8,'Aleksandr','Pushkin',7,4),(9,'Aleksandr','Loshochek',8,5),(10,'Aleksandr','Norm',9,6),(11,'Aleksandr','Pisichnik',10,7),(12,'1ASDASD','qwqw',1,1),(13,'123','123',1,1),(14,'qwer','qwrqwr',12,13),(15,'asd','asd',10,13),(16,'Brom','Bromov',11,5),(17,'Gnom','Gnomov',16,5),(18,'Hru','Hru',17,7),(19,'Alo','Alov',18,16),(20,'Fira','Firov',19,16),(21,'Nikita','Nikitkin',1,18),(22,'Danya','Danilkin',21,18),(23,'Jora','Jorav',22,18),(24,'Boba','Bobov',NULL,13),(25,'Boba','Bobov',23,13);
/*!40000 ALTER TABLE `master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_service_center_record`
--

DROP TABLE IF EXISTS `master_service_center_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_service_center_record` (
  `master_id` int(11) NOT NULL,
  `service_record_id` int(11) NOT NULL,
  PRIMARY KEY (`master_id`,`service_record_id`),
  KEY `service_record_id` (`service_record_id`),
  CONSTRAINT `master_service_center_record_ibfk_1` FOREIGN KEY (`master_id`) REFERENCES `master` (`id`) ON DELETE CASCADE,
  CONSTRAINT `master_service_center_record_ibfk_2` FOREIGN KEY (`service_record_id`) REFERENCES `service_record` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_service_center_record`
--

LOCK TABLES `master_service_center_record` WRITE;
/*!40000 ALTER TABLE `master_service_center_record` DISABLE KEYS */;
INSERT INTO `master_service_center_record` VALUES (2,3),(3,3),(4,4),(5,5),(5,6),(6,6),(7,6),(7,7),(7,8),(8,8),(9,9),(10,10),(10,11);
/*!40000 ALTER TABLE `master_service_center_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_center`
--

DROP TABLE IF EXISTS `service_center`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_center` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `street` varchar(20) NOT NULL,
  `house` int(11) NOT NULL,
  `number_seats` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_id` (`country_id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `service_center_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_center_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_center`
--

LOCK TABLES `service_center` WRITE;
/*!40000 ALTER TABLE `service_center` DISABLE KEYS */;
INSERT INTO `service_center` VALUES (1,'Auto pochnki',1,1,'Lenina',2,4),(2,'Auto lomalki',2,2,'Hunina',4,4),(3,'Chemodan',3,3,'Buba',123,1),(4,'Auto chinitel',4,4,'Perekrestok',121,10),(5,'Auto ubivatel',5,5,'Pereulok',45,12),(6,'Auto kroshitel',6,6,'Ulitsa',15,15),(7,'Auto prikol',7,7,'Prikol',90,15),(8,'Auto krutyak',8,8,'Krutyak',89,20),(9,'Auto car',9,9,'Jijuju',189,13),(10,'Car car',10,10,'Kolosa',129,10),(11,'as',1,1,'asda',1,1),(12,'auto meme',2,2,'pipi',2,12),(13,'auto pipi',1,1,'treiu',12,12),(14,'auto opop',1,1,'Rikao',21,12),(15,'auto',1,1,'Vola',12,12),(16,'Auto reznya',1,1,'Sar',13,13),(17,'Auto kiki',1,1,'Gio',12,12),(18,'Auto kuku',2,2,'Sierra',12,12),(19,'Auto pupu',2,2,'Gitu',13,13),(20,'Car fix',2,2,'Titara ',2,2),(21,'Car popo',1,2,'Rikao',1,1),(22,'Car fifa',2,2,'Ewq',12,12),(23,'as',2,2,'treiu',45,56),(24,'qwe',1,1,'Dida',22,2);
/*!40000 ALTER TABLE `service_center` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_record`
--

DROP TABLE IF EXISTS `service_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `car_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `service_record_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE,
  CONSTRAINT `service_record_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_record`
--

LOCK TABLES `service_record` WRITE;
/*!40000 ALTER TABLE `service_record` DISABLE KEYS */;
INSERT INTO `service_record` VALUES (3,3,3,'2022-04-21'),(4,4,4,'2022-02-01'),(5,5,5,'2022-09-03'),(6,6,6,'2022-01-09'),(7,7,7,'2022-02-01'),(8,8,8,'2022-12-01'),(9,11,10,'2022-11-02'),(10,12,11,'2022-10-12'),(11,13,9,'2022-10-21'),(12,1,1,'2022-01-01'),(13,1,1,'2022-09-09'),(14,1,1,'2022-09-10'),(15,1,1,'2022-09-10'),(16,1,1,'2022-09-11'),(17,1,1,'2022-09-01'),(18,1,1,'2022-09-01'),(19,2,2,'2022-09-12'),(20,1,1,'2022-09-12'),(21,1,1,'2022-09-13'),(22,1,1,'2022-09-05'),(23,1,1,'2022-09-05'),(24,1,1,'2022-09-05'),(25,1,1,'2022-09-05'),(26,1,1,'2022-09-05'),(27,1,1,'2022-09-05'),(28,1,1,'2022-09-06'),(29,1,1,'2022-09-20'),(30,1,2,'2022-08-31'),(31,1,2,'2022-08-28'),(32,1,2,'2022-09-07'),(33,1,1,'2022-09-30'),(34,1,2,'2022-09-14'),(35,1,2,'2022-09-07'),(36,1,2,'2022-09-07'),(37,1,2,'2022-09-14'),(38,1,1,'2022-09-14'),(39,1,2,'2022-09-14'),(40,3,3,'2022-09-27'),(41,1,3,'2022-09-14'),(42,3,3,'2022-09-01'),(43,3,3,'2022-09-07'),(44,3,3,'2022-09-15'),(45,30,27,'2022-09-30'),(46,31,28,'2022-10-03'),(47,31,28,'2022-10-07'),(48,31,28,'2022-10-07'),(49,31,28,'2022-10-09'),(50,31,28,'2022-10-10'),(51,31,28,'2022-10-13'),(52,31,28,'2022-10-26');
/*!40000 ALTER TABLE `service_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-13 19:24:02
