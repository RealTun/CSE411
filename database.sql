CREATE DATABASE  IF NOT EXISTS `cluster1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cluster1`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cluster1
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
  `GPA` decimal(5,2) NOT NULL,
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
INSERT INTO `group_selects` VALUES ('2151160496','Nguyễn Đăng Hoàng Giang',8.50,8.70,3.00,1.50,0,'Tốt','Khá','Nội dung',1.00,0.00),('2151160501','Nguyễn Trung Hiếu',7.00,6.00,3.00,2.00,1,'Khá','Tốt','Công nghệ',3.00,0.00),('2151160512','Nguyễn Năng Vũ Hùng',8.20,6.00,3.00,1.00,0,'Khá','Trung bình','Nội dung',3.00,0.00),('2151160519','Nguyễn Phương Mai',8.50,9.50,3.00,3.00,0,'Tốt','Tốt','Công nghệ',4.00,1.00),('2151160535','Hạ Quang Dũng',8.25,9.45,3.00,2.00,0,'Tốt','Tốt','Công nghệ',2.00,0.00),('2151163664','Nguyễn Đức Anh',8.20,10.00,3.00,3.00,0,'Tốt','Tốt','Công nghệ',4.00,1.00),('2151163668','Nguyễn Ngọc Bách',8.60,9.00,3.00,2.00,0,'Khá','Tốt','Kỹ thuật',1.00,0.00),('2151163680','Bùi Quang Đạo',8.00,8.50,3.00,1.00,0,'Trung bình','Trung bình','Kỹ thuật',1.00,0.00),('2151163689','Triệu Thị Hậu',9.00,10.00,3.00,4.00,0,'Tốt','Khá','Công nghệ',4.00,1.00),('2151163696','Phạm Ánh Hường',8.00,8.50,3.00,3.00,0,'Tốt','Trung bình','Nội dung',2.00,0.00),('2151163702','Tào Hồng Lê',8.00,8.70,3.00,3.00,0,'Trung bình','Trung bình','Nội dung',2.00,0.00),('2151163708','Phạm Nhật Minh',7.50,8.70,3.00,1.00,1,'Khá','Trung bình','Kỹ thuật',1.00,0.00),('2151163709','Nguyễn Tuấn Ngọc',7.50,6.00,3.00,3.00,0,'Tốt','Khá','Kỹ thuật',4.00,0.00),('2151163713','Đào Hải Phúc',7.00,0.00,3.00,3.00,0,'Khá','Khá','Công nghệ',3.00,0.00),('2151163718','Phạm Văn Quý',8.25,9.30,3.00,5.00,0,'Khá','Khá','Nội dung',3.00,0.00),('2151163722','Đàm Khắc Thái',8.50,8.70,3.00,1.50,0,'Khá','Khá','Kỹ thuật',1.00,0.00),('2151163724','Lê Quang Thanh',8.50,10.00,3.00,2.00,0,'Khá','Tốt','Kỹ thuật',4.00,1.00),('2151163731','Đỗ Thị Thương',8.00,9.05,3.00,3.00,0,'Tốt','Khá','Nội dung',2.00,0.00),('2151163738','Đỗ Hữu Tuấn',8.70,9.20,3.00,4.00,0,'Khá','Tốt','Công nghệ',2.00,0.00),('2251162190','Lê Văn Trung',7.00,7.00,3.00,1.00,0,'Khá','Tốt','Công nghệ',3.00,0.00);
/*!40000 ALTER TABLE `group_selects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `Average_MIS_Score` decimal(5,2) NOT NULL,
  `Average_BigData_Score` decimal(5,2) NOT NULL,
  `GPA` decimal(5,2) NOT NULL,
  `Average_Self_Study_Time` decimal(5,2) NOT NULL,
  `Number_of_Late_Attendances_in_Phase_1` int NOT NULL,
  `Soft_Skills` varchar(255) NOT NULL,
  `Technology_Usage_Skills` varchar(255) NOT NULL,
  `Strengths` varchar(255) NOT NULL,
  `Muc_do` decimal(7,2) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('2151160496','Nguyễn Đăng Hoàng Giang',8.50,8.70,3.00,1.50,0,'Tốt','Khá','Nội dung',10.00),('2151160501','Nguyễn Trung Hiếu',7.00,6.00,2.31,2.00,1,'Khá','Tốt','Công nghệ',1.00),('2151160512','Nguyễn Năng Vũ Hùng',8.20,6.00,1.80,1.00,0,'Khá','Trung bình','Nội dung',1.00),('2151160519','Nguyễn Phương Mai',8.50,9.60,3.20,3.00,0,'Tốt','Tốt','Công nghệ',1000.00),('2151160535','Hạ Quang Dũng',8.25,9.45,3.43,2.00,0,'Tốt','Tốt','Công nghệ',100.00),('2151163664','Nguyễn Đức Anh',8.20,10.00,2.80,3.00,0,'Tốt','Tốt','Công nghệ',1000.00),('2151163668','Nguyễn Ngọc Bách',8.60,9.00,2.94,2.00,0,'Khá','Tốt','Kỹ thuật',10.00),('2151163680','Bùi Quang Đạo',8.00,8.50,3.20,1.00,0,'Trung bình','Trung bình','Kỹ thuật',10.00),('2151163689','Triệu Thị Hậu',9.00,10.00,2.80,4.00,0,'Tốt','Khá','Công nghệ',1000.00),('2151163696','Phạm Ánh Hường',8.00,8.50,2.71,3.00,0,'Tốt','Trung bình','Nội dung',100.00),('2151163702','Tào Hồng Lê',8.00,8.70,3.24,3.00,0,'Trung bình','Trung bình','Nội dung',100.00),('2151163708','Phạm Nhật Minh',7.50,8.70,2.30,1.00,1,'Khá','Trung bình','Kỹ thuật',10.00),('2151163709','Nguyễn Tuấn Ngọc',7.50,6.00,2.04,3.00,0,'Tốt','Khá','Kỹ thuật',1000.00),('2151163713','Đào Hải Phúc',7.00,0.00,2.66,3.00,0,'Khá','Khá','Công nghệ',1.00),('2151163718','Phạm Văn Quý',8.25,9.30,3.02,5.00,0,'Khá','Khá','Nội dung',1.00),('2151163722','Đàm Khắc Thái',8.50,8.70,2.88,1.50,0,'Khá','Khá','Kỹ thuật',10.00),('2151163724','Lê Quang Thanh',8.50,10.00,3.40,2.00,0,'Khá','Tốt','Kỹ thuật',1000.00),('2151163731','Đỗ Thị Thương',8.00,9.05,2.80,3.00,0,'Tốt','Khá','Nội dung',100.00),('2151163738','Đỗ Hữu Tuấn',8.70,9.20,3.28,4.00,0,'Khá','Tốt','Công nghệ',100.00),('2251162190','Lê Văn Trung',7.00,7.00,2.33,1.00,0,'Khá','Tốt','Công nghệ',1.00);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_cluster_1`
--

DROP TABLE IF EXISTS `students_cluster_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_cluster_1` (
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `Average_MIS_Score` decimal(5,2) NOT NULL,
  `Average_BigData_Score` decimal(5,2) NOT NULL,
  `GPA` decimal(5,2) NOT NULL,
  `Average_Self_Study_Time` decimal(5,2) NOT NULL,
  `Number_of_Late_Attendances_in_Phase_1` int NOT NULL,
  `Soft_Skills` varchar(255) NOT NULL,
  `Technology_Usage_Skills` varchar(255) NOT NULL,
  `Strengths` varchar(255) NOT NULL,
  `Muc_do` decimal(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_cluster_1`
--

LOCK TABLES `students_cluster_1` WRITE;
/*!40000 ALTER TABLE `students_cluster_1` DISABLE KEYS */;
INSERT INTO `students_cluster_1` VALUES ('2151160496','Nguyễn Đăng Hoàng Giang',8.50,8.70,3.00,1.50,0,'Tốt','Khá','Nội dung',10.00),('2151160501','Nguyễn Trung Hiếu',7.00,6.00,3.00,2.00,1,'Khá','Tốt','Công nghệ',1.00),('2151160512','Nguyễn Năng Vũ Hùng',8.20,6.00,3.00,1.00,0,'Khá','Trung bình','Nội dung',1.00),('2151160519','Nguyễn Phương Mai',8.50,9.50,3.00,3.00,0,'Tốt','Tốt','Công nghệ',1000.00),('2151160535','Hạ Quang Dũng',8.25,9.45,3.00,2.00,0,'Tốt','Tốt','Công nghệ',100.00),('2151163664','Nguyễn Đức Anh',8.20,10.00,3.00,3.00,0,'Tốt','Tốt','Công nghệ',1000.00),('2151163668','Nguyễn Ngọc Bách',8.60,9.00,3.00,2.00,0,'Khá','Tốt','Kỹ thuật',10.00),('2151163680','Bùi Quang Đạo',8.00,8.50,3.00,1.00,0,'Trung bình','Trung bình','Kỹ thuật',10.00),('2151163689','Triệu Thị Hậu',9.00,9.80,3.00,4.00,0,'Tốt','Khá','Công nghệ',1000.00),('2151163696','Phạm Ánh Hường',8.00,8.50,3.00,3.00,0,'Tốt','Trung bình','Nội dung',100.00),('2151163702','Tào Hồng Lê',8.00,8.70,3.00,3.00,0,'Trung bình','Trung bình','Nội dung',100.00),('2151163708','Phạm Nhật Minh',7.50,8.70,3.00,1.00,1,'Khá','Trung bình','Kỹ thuật',10.00),('2151163709','Nguyễn Tuấn Ngọc',7.50,6.00,3.00,3.00,0,'Tốt','Khá','Kỹ thuật',1000.00),('2151163713','Đào Hải Phúc',7.00,0.00,3.00,3.00,0,'Khá','Khá','Công nghệ',1.00),('2151163718','Phạm Văn Quý',8.25,9.30,3.00,5.00,0,'Khá','Khá','Nội dung',1.00),('2151163722','Đàm Khắc Thái',8.50,8.70,3.00,1.50,0,'Khá','Khá','Kỹ thuật',10.00),('2151163724','Lê Quang Thanh',8.50,9.50,3.00,2.00,0,'Khá','Tốt','Kỹ thuật',1000.00),('2151163731','Đỗ Thị Thương',8.00,9.05,3.00,3.00,0,'Tốt','Khá','Nội dung',100.00),('2151163738','Đỗ Hữu Tuấn',8.70,9.20,3.00,4.00,0,'Khá','Tốt','Công nghệ',100.00),('2251162190','Lê Văn Trung',7.00,7.00,3.00,1.00,0,'Khá','Tốt','Công nghệ',1.00);
/*!40000 ALTER TABLE `students_cluster_1` ENABLE KEYS */;
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
INSERT INTO `topic_selects` VALUES ('2151160496',3.00),('2151160501',2.00),('2151160512',2.00),('2151160519',1.00),('2151160535',4.00),('2151163664',1.00),('2151163668',3.00),('2151163680',3.00),('2151163681',3.00),('2151163683',2.00),('2151163689',1.00),('2151163696',4.00),('2151163702',4.00),('2151163708',3.00),('2151163709',1.00),('2151163713',2.00),('2151163718',2.00),('2151163722',3.00),('2151163724',1.00),('2151163731',4.00),('2151163738',4.00),('2251162190',2.00);
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
INSERT INTO `users` VALUES ('2151160519','$2b$10$kqCID6y2H/nOIlA/fVrxp.R0HsgTWgYbYWBCE2U6ypPWUXTt03.US','43fe44c6-c334-4182-8cd4-c6fd65c7bc6a','admin','offline'),('2151163664','$2b$10$OMyw/ZshOL2L2JCRBdHkmudnW45xE9r2yJFXvGEaivNqxnX9jTYma','2b0015c7-7036-4f33-a5b5-49fca1bd6758','normal','online'),('2151163668','$2b$10$CwWGhubhCYtvguFdBkOOF.6k/KgBvkQxb0zHsgp3z.CxK4mcS1YtO','d98c0825-454e-4771-866e-6c9c182e9bed','normal','offline'),('2151163681','$2b$10$LKzdvUQlx1w3kUbtybZuCO0Oj.DepplAn2KWGkylrXzZiFiXuBNPa','','normal','offline'),('2151163683','$2b$10$/ExpwSXjbbJdfQZThYEOC.wlABR1eX3895EfnSltv5qmf1JoADhfu','','normal','online'),('2151163689','$2b$10$XNFbFydvucgD4ck7qWWnReoKaxIsaYtorhwcOzkfrjOaz7IdDQroG','','normal','online'),('2151163718','$2b$10$XGERAxefuntUR0JS2952veTm0rudYEPpLW5a8Fy0.Wx0XrErUwcqe','c117b732-c512-48ec-8172-eae9318afc6a','normal','online'),('2151163724','$2b$10$yVKCaqo.AZJ.5jmA2jzESe12DAhiyJqMZI0VXkDsdtlTfYDMnE95a','6b33e80b-be17-47d0-b37c-3b7c3e4f6538','normal','offline'),('2151163738','$2b$10$9UM4R.y6IswUNCI7i50ykOSeRXWh5mNcdEyUO1V46I3ZmqHbA21rq','3831e1a2-4e6d-495c-a640-5172d30c52cf','normal','online'),('admin','$2b$10$2OWOiT1DjcWyDpHoX9EaJOcI0olrJuAPlnE3prpM6jQFp/aj3frYy','','normal','online');
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

-- Dump completed on 2024-12-05 22:11:12
