CREATE DATABASE  IF NOT EXISTS `cluster1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cluster1`;
-- MySQL dump 10.13  Distrib 9.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: cluster1
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group_selects`
--

DROP TABLE IF EXISTS `group_selects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_selects` (
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `Average_MIS_Score` decimal(5,2) NOT NULL,
  `Average_BigData_Score` decimal(5,2) NOT NULL,
  `Average_Self_Study_Time` decimal(5,2) NOT NULL,
  `Number_of_Late_Attendances_in_Phase_1` int NOT NULL,
  `Soft_Skills` varchar(255) NOT NULL,
  `Technology_Usage_Skills` varchar(255) NOT NULL,
  `Strengths` varchar(255) NOT NULL,
  `Group` decimal(5,2) NOT NULL,
  `Topic` decimal(5,2) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_selects`
--

LOCK TABLES `group_selects` WRITE;
/*!40000 ALTER TABLE `group_selects` DISABLE KEYS */;
INSERT INTO `group_selects` VALUES ('2151160496','Nguyễn Đăng Hoàng Giang',8.50,8.70,1.50,0,'Tốt','Khá','Nội dung',2.00,1.00),('2151160501','Nguyễn Trung Hiếu',7.00,6.00,2.00,1,'Khá','Tốt','Công nghệ',1.00,0.00),('2151160512','Nguyễn Năng Vũ Hùng',8.20,6.00,1.00,0,'Khá','Trung bình','Nội dung',1.00,0.00),('2151160519','Nguyễn Phương Mai',8.50,9.50,3.00,0,'Tốt','Tốt','Công nghệ',4.00,1.00),('2151160535','Hạ Quang Dũng',8.25,9.45,2.00,0,'Tốt','Tốt','Công nghệ',3.00,1.00),('2151163664','Nguyễn Đức Anh',10.00,8.30,3.00,0,'Tốt','Tốt','Công nghệ',4.00,1.00),('2151163668','Nguyễn Ngọc Bách',8.60,9.00,2.00,0,'Khá','Tốt','Kỹ thuật',2.00,0.00),('2151163680','Bùi Quang Đạo',8.00,8.50,1.00,0,'Trung bình','Trung bình','Kỹ thuật',2.00,0.00),('2151163689','Triệu Thị Hậu',9.00,9.80,4.00,0,'Tốt','Khá','Công nghệ',4.00,1.00),('2151163696','Phạm Ánh Hường',8.00,8.50,3.00,0,'Tốt','Trung bình','Nội dung',3.00,1.00),('2151163702','Tào Hồng Lê',8.00,8.70,3.00,0,'Trung bình','Trung bình','Nội dung',3.00,0.00),('2151163708','Phạm Nhật Minh',7.50,8.70,1.00,1,'Khá','Trung bình','Kỹ thuật',2.00,0.00),('2151163709','Nguyễn Tuấn Ngọc',7.50,6.00,3.00,0,'Tốt','Khá','Kỹ thuật',4.00,1.00),('2151163713','Đào Hải Phúc',7.00,0.00,3.00,0,'Khá','Khá','Công nghệ',1.00,0.00),('2151163718','Phạm Văn Quý',8.25,9.30,5.00,0,'Khá','Khá','Nội dung',1.00,0.00),('2151163722','Đàm Khắc Thái',8.50,8.70,1.50,0,'Khá','Khá','Kỹ thuật',2.00,0.00),('2151163724','Lê Quang Thanh',8.50,9.50,2.00,0,'Khá','Tốt','Kỹ thuật',4.00,0.00),('2151163731','Đỗ Thị Thương',8.00,9.05,3.00,0,'Tốt','Khá','Nội dung',3.00,1.00),('2151163738','Đỗ Hữu Tuấn',8.70,9.20,4.00,0,'Khá','Tốt','Công nghệ',3.00,0.00),('2251162190','Lê Văn Trung',7.00,7.00,1.00,0,'Khá','Tốt','Công nghệ',1.00,0.00);
/*!40000 ALTER TABLE `group_selects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_selects`
--

DROP TABLE IF EXISTS `topic_selects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_selects` (
  `username` varchar(255) NOT NULL,
  `Topic` decimal(5,2) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_selects`
--

LOCK TABLES `topic_selects` WRITE;
/*!40000 ALTER TABLE `topic_selects` DISABLE KEYS */;
INSERT INTO `topic_selects` VALUES ('2151163664',1.00);
/*!40000 ALTER TABLE `topic_selects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'normal',
  `state` varchar(45) DEFAULT 'offline',
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2151163664','$2b$10$OMyw/ZshOL2L2JCRBdHkmudnW45xE9r2yJFXvGEaivNqxnX9jTYma','1d356d58-ac51-4351-bb0e-83f616aff85a','normal','online'),('2151163724','$2b$10$yVKCaqo.AZJ.5jmA2jzESe12DAhiyJqMZI0VXkDsdtlTfYDMnE95a','4199ce93-4cf2-41fd-9468-75785cef6982','normal','online');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 11:56:08