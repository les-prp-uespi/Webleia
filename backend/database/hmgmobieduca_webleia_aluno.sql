-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: 192.99.18.63    Database: hmgmobieduca_webleia
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uf` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grau_instrucao_id` bigint unsigned NOT NULL,
  `instituicao_ensino_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `cpf` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aluno_email_unique` (`email`),
  KEY `aluno_grau_instrucao_id_foreign` (`grau_instrucao_id`),
  KEY `aluno_instituicao_ensino_id_foreign` (`instituicao_ensino_id`),
  CONSTRAINT `aluno_grau_instrucao_id_foreign` FOREIGN KEY (`grau_instrucao_id`) REFERENCES `grau_instrucao` (`id`),
  CONSTRAINT `aluno_instituicao_ensino_id_foreign` FOREIGN KEY (`instituicao_ensino_id`) REFERENCES `instituicao_ensino` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (1,'Danilo Falcão Barrinha','dbarrinha@hotmail.com','pi',1,52382,'2024-09-21 01:15:27','2024-09-21 01:15:27',NULL,NULL),(3,'Luiz Felipe Soares da Silva','luizdevbrasil@gmail.com','SP',1,136657,'2024-09-23 18:36:09','2024-09-23 18:36:09',NULL,NULL),(4,'Luiz Felipe Soares da Silva','luizdevbrasil+1@gmail.com','SP',1,136657,'2024-09-23 20:07:42','2024-09-23 20:07:42',NULL,NULL),(5,'Luiz Felipe Soares da Silva','luizdevbrasil+2@gmail.com','SP',1,136657,'2024-09-23 20:09:02','2024-09-23 20:09:02',NULL,NULL),(6,'Danilo teste atu','mobiedemo@mobieduca.me','CE',3,136664,'2024-09-24 05:11:07','2024-09-28 23:29:30',NULL,NULL),(7,'Renato Félix','renatofelixdev@gmail.com','PI',3,136658,'2024-09-25 16:42:22','2024-09-25 16:42:22',NULL,NULL),(8,'fsdfsdfsdf','mobiedemo22@mobieduca.me','MA',1,136660,'2024-09-25 18:03:02','2024-09-25 18:03:02',NULL,NULL),(10,'BÁRBARA OLÍMPIA RAMOS DE MELO','barbara.olimpia@ccm.uespi.br','PI',3,136656,'2024-09-26 01:33:02','2024-09-26 01:33:02',NULL,NULL),(11,'Luiz Felipe Soares da Silva','luizdevbrasil+12@gmail.com','SP',1,136664,'2024-09-26 14:56:33','2024-09-26 14:56:33',NULL,NULL),(12,'Luiz Felipe Soares da Silva','luizdevbrasil+55@gmail.com','0',1,136657,'2024-09-26 14:57:46','2024-09-26 14:57:46',NULL,NULL),(13,'Aluno Open Com Login','teste@mail.com','PI',1,1,'2024-09-29 18:02:20','2024-09-29 18:02:20',NULL,NULL),(16,'Aluno 2','magnoleal89@gmail.com','PI',1,1,'2024-09-29 18:12:24','2024-10-03 12:55:57',NULL,NULL),(17,'danilo atualizado2','danilo.barrinha@mobimark.com.br','BA',3,158028,'2024-09-29 19:49:08','2024-10-02 23:41:51',NULL,'05806766330'),(18,'FELIX','renatofelixss@hotmail.com','PI',3,373,'2024-10-01 22:47:27','2024-10-13 12:16:01',NULL,NULL),(19,'JOHN HELIO PORANGABA DE OLIVEIRA','jhpoingles@gmail.com','PI',3,373,'2024-10-02 18:12:06','2024-10-02 18:12:06',NULL,NULL),(20,'Franklin Oliveira Silva','franklinoliveira@cchl.uespi.br','PI',3,373,'2024-10-02 18:12:29','2024-10-02 18:35:47',NULL,'83777741353'),(21,'Danilo Falcão Barrinha','dbarrinhab2c@gmail.com','PI',1,155940,'2024-10-05 00:01:46','2024-10-05 00:01:46',NULL,NULL),(22,'Ruan                                                                 Carlos    9','operador.mobi.ruan@gmail.com','PI',2,373,'2024-10-21 16:29:56','2024-10-21 19:30:30',NULL,NULL),(25,'Shirlei Marly Alves','shirleimarly@ccm.uespi.br','PI',3,373,'2024-10-27 14:18:46','2024-10-27 14:18:46',NULL,NULL),(27,'BÁRBARA  MELO','barbaraolimpiam@gmail.com','PI',3,373,'2024-10-28 18:08:49','2024-10-28 18:08:49',NULL,NULL),(28,'ANTONIO ARTUR SILVA CANTUÁRIO','antonioartursilvacantuario@hotmail.com','PI',3,373,'2024-11-01 19:10:28','2024-11-01 19:10:28',NULL,NULL),(29,'Franklin Oliveira Silva','franklinolliveira@gmail.com','PI',3,373,'2024-11-29 19:20:15','2024-11-29 19:20:15',NULL,NULL),(30,'Marcos Vinícius','marcos.sousa462@gmail.com','PI',2,373,'2024-12-04 13:45:59','2024-12-05 18:57:17',NULL,NULL),(31,'Wallyton Santos','awallytondosss@aluno.uespi.br','PI',2,373,'2024-12-09 17:24:45','2024-12-09 17:24:45',NULL,NULL),(32,'Yasmin Lowane','yasminsousa@aluno.uespi.br','PI',2,373,'2024-12-09 17:34:39','2024-12-09 17:38:38',NULL,NULL),(33,'Expedita Maria Silva feitosa','expedita.maria.s.feitosa@aluno.uespi.br','PI',2,NULL,'2024-12-09 17:35:00','2024-12-09 17:35:00',NULL,NULL),(34,'Ana Clara Silva Martins','anaclarasilvamartins@aluno.uespi.br','PI',2,373,'2024-12-09 17:35:04','2024-12-09 17:35:04',NULL,NULL),(35,'Nayara Lopes Aguiar','nayaralopesa@aluno.uespi.br','PI',2,373,'2024-12-09 17:35:10','2024-12-09 17:35:10',NULL,NULL),(36,'Expedita Feitosa','expeditamariasilvafeitosa@gmail.com','PI',2,NULL,'2024-12-09 17:40:28','2024-12-09 17:40:28',NULL,NULL),(37,'Cailani Alves de Carvalho','cailanicarvalho0@gmail.com','PI',2,373,'2025-01-03 21:39:52','2025-01-03 21:39:52',NULL,NULL),(38,'Francisco Lucas Oliveira Silva','franciscolucasdev@gmail.com','PI',2,658,'2025-01-07 13:52:44','2025-01-07 13:52:44',NULL,NULL);
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 16:10:42
