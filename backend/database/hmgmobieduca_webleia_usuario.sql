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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `perfil` tinyint unsigned NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `aluno_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_email_unique` (`email`),
  KEY `usuario_aluno_id_foreign` (`aluno_id`),
  CONSTRAINT `usuario_aluno_id_foreign` FOREIGN KEY (`aluno_id`) REFERENCES `aluno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Magno Leal','magnoleal89@gmail.com','$2y$12$reNhtfK77GwJOETOOc9MReKMGyKUc2JLTucBX6O3CD1y/U6pO5rPK',NULL,1,'2024-09-29 18:21:47','XgnArLj3tSKk973ux3XrvPW8b12O3MKoaf74bibZeOCGggffeoXNh9jbBTww','2024-09-18 15:43:40','2024-09-29 17:59:37',NULL,NULL),(2,'Admin','admin@teste.com','$2y$12$dGAyVXcGOjyEitg6x9JTye7qUvu4Qs/hL4tIqkEaITRMDBm0E7F/2',NULL,1,'2024-09-29 18:21:47',NULL,'2024-09-18 15:43:40','2024-09-18 15:43:40',NULL,NULL),(3,'Danilo Falcão Barrinha','dbarrinha@hotmail.com','$2y$12$dGAyVXcGOjyEitg6x9JTye7qUvu4Qs/hL4tIqkEaITRMDBm0E7F/2',NULL,2,NULL,NULL,'2024-09-21 01:15:27','2024-09-21 01:15:27',NULL,1),(4,'Luiz Felipe Soares da Silva','luizdevbrasil@gmail.com','$2y$12$CRBPfp7s7n6oqAVfzO46XeRsv2HM8dC1RGFWMmOtv/rSznHMXeE1q',NULL,2,NULL,'KzLFA3Z1zfiCysjRGsxnTA3odiX7HP4zRtHWl7S4KlvIcC7BhgfRpUotaDsO','2024-09-23 18:36:09','2024-09-30 14:47:35',NULL,3),(5,'Luiz Felipe Soares da Silva','luizdevbrasil+1@gmail.com','$2y$12$0Qh0maNmNng.4xzXMWg3cOERf/1vWSFmiY3NmoD/99V/7RKpwD/kS',NULL,2,NULL,NULL,'2024-09-23 20:07:42','2024-09-23 20:07:42',NULL,4),(6,'Luiz Felipe Soares da Silva','luizdevbrasil+2@gmail.com','$2y$12$wPeX7yiBnpw4gH0e1exx3OoI/v0igblsbYNN85iqpvwFehdSK4xjG',NULL,2,NULL,NULL,'2024-09-23 20:09:03','2024-09-23 20:09:03',NULL,5),(7,'Danilo teste atu','mobiedemo@mobieduca.me','$2y$12$2ZB12Tc/GbUQbJkJrpRU6ehS1Yk7AYUTXZQj7ROAENU8FY.ZF/6q6','https://www.mobifile.com.br/files/webleia/usuarios/187df55c5810cdb77d8429faed295042.png',2,NULL,NULL,'2024-09-24 05:11:07','2024-09-29 19:46:59',NULL,6),(8,'Renato Félix','renatofelixdev@gmail.com','$2y$12$l6903bmOSPa7ckd60.vzcOWL0c2EwuqazkigfSX/PCWMvyraQ1EMq',NULL,2,NULL,'k2QDAJP0RC6eVwUHALyyVdmAFvUkQwiGUy3rTAaqGN2jxX8AnpejEPVZIJwP','2024-09-25 16:42:22','2024-10-01 23:46:19',NULL,7),(9,'fsdfsdfsdf','mobiedemo22@mobieduca.me','$2y$12$Q1Xfd0X9j0YrGEq/U6ZhnOV7BclbuA4DrukX0ffG633zJ.u5ee/r6',NULL,2,NULL,NULL,'2024-09-25 18:03:02','2024-09-25 18:03:02',NULL,8),(11,'BÁRBARA OLÍMPIA RAMOS DE MELO','barbara.olimpia@ccm.uespi.br','$2y$12$SHL8n10NChtz4N4/MojkAessHHGnuhF1RqNZV/09fnBrm9pmDEKVm',NULL,1,'2024-10-21 16:30:38','UaWCHF8ZmH1SIylO5T1PqZEBsfX8LPU7DZQN86GEbi4M32rgPoQncqPijrUo','2024-09-26 01:33:02','2024-10-27 13:27:45',NULL,NULL),(12,'Luiz Felipe Soares da Silva','luizdevbrasil+12@gmail.com','$2y$12$gaDF6FZ7Ahvsw3YKieEDO.XTZy/7pA7M2NqbC/jlyNNlBxcsB42ZG',NULL,2,NULL,NULL,'2024-09-26 14:56:33','2024-09-26 14:56:33',NULL,11),(13,'Luiz Felipe Soares da Silva','luizdevbrasil+55@gmail.com','$2y$12$T5I6CmSYLp5X69fXhzNEluuQHZDtQDzj/xH51yrbVgb1W6vSjiwXG',NULL,2,NULL,NULL,'2024-09-26 14:57:46','2024-09-26 14:57:46',NULL,12),(14,'Aluno Open Com Login','teste@mail.com','$2y$12$kKw/T44FNc05AwHc3s0P/O1tsIRBfFzKms6Wr5a8RHGFAP7fX1d2m',NULL,2,NULL,NULL,'2024-09-29 18:02:23','2024-09-29 18:02:23',NULL,13),(17,'Aluno 2','teste2@mail.com','$2y$12$2pD9cXHctcFgrAx/c2nUR.MIbhChPeaC/NOCIe1lt8cizoyPHxXJ.','https://www.mobifile.com.br/files/webleia/usuarios/f4f25dd93928e82a6be303f650a7db04.jpeg',2,'2024-09-29 18:21:47',NULL,'2024-09-29 18:12:27','2024-10-02 14:18:58',NULL,16),(18,'danilo atualizado2','danilo.barrinha@mobimark.com.br','$2y$12$9P1/RVAj0XfdYak7sELiy.vWz0bbZQaV4ocO.trL994ldcoP80zCC','https://www.mobifile.com.br/files/webleia/usuarios/94b6230f8a0ce0c12a058e8c019aaf43.jpeg',2,'2024-09-29 19:52:39','NoK68UmfzCgRGqBqASfIqFETC5ui6XeQ4M0oC6Lge5BsaTVQIAj6UT4HS7bf','2024-09-29 19:49:09','2024-10-09 22:27:22',NULL,17),(19,'FELIX','renatofelixss@hotmail.com','$2y$12$MNBzJjBWFVwTmSMQHUeLI.58C6pgqM83XJYZpZCGaMRuYSxc8UYYK','https://www.mobifile.com.br/files/webleia/usuarios/da60da615848e8329203d727750c2b68.jpeg',2,'2024-09-29 19:52:39',NULL,'2024-10-01 22:47:27','2024-10-13 12:15:29',NULL,18),(20,'JOHN HELIO PORANGABA DE OLIVEIRA','jhpoingles@gmail.com','$2y$12$2hEy4XyXBqmhEvR4qHoKd.KtYm0VtzoHLqPBV6PjePFs/jII.8t8S','https://www.mobifile.com.br/files/webleia/usuarios/4353047c646d1572c28168abe601f2db.jpeg',2,'2024-10-02 18:13:45','dnrUaREgTHaUqijVqSARDZDmkEhQbdKSjPo1VRp5e6JPUxKgSmaRVPn84BWP','2024-10-02 18:12:06','2024-12-06 13:16:48',NULL,19),(21,'Franklin Oliveira Silva','franklinoliveira@cchl.uespi.br','$2y$12$7DB8ofq8XD32CJXd4Ho0l.PH2Z/N1FHduvOwplbydBoHp9PI2iAI2','https://www.mobifile.com.br/files/webleia/usuarios/effa298ca616425c1b17ce35070cd2c0.png',1,'2024-10-02 18:13:12',NULL,'2024-10-02 18:12:30','2024-10-02 18:35:17',NULL,NULL),(22,'Danilo Falcão Barrinha','dbarrinhab2c@gmail.com','$2y$12$hEKwJfgCks19x.u9aUl4Eu4IjgEcDWRECMCg6MFfjGa7fywEv.fG2',NULL,2,'2024-10-05 00:02:53',NULL,'2024-10-05 00:01:47','2024-10-05 00:02:53',NULL,21),(23,'Ruan                                                                 Carlos    9','operador.mobi.ruan@gmail.com','$2y$12$3Ew3lyw4u7LYiqvMGolYTOQQXIvVBIuU4N6QdGp4SA8hCMpEON2fC',NULL,2,'2024-10-21 16:30:38','I7xTk6C5n0gjxDIcTjuyX1P9JVRNXyVqdjVjXDqqgwr3WTYYMisILcLCS1it','2024-10-21 16:29:56','2024-10-21 19:38:57',NULL,22),(24,'John Helio','johnhelio@uespi.br','$2y$12$CGnH5/PzCd4lluHac1w3MeE.8k6pblP76atwSfoDq60AZpfIWteDa',NULL,1,'2024-10-21 16:30:38','7Ehqr4yjZBXw97vhN4k2zJqYgzbqqg5fLaF9PuC2OkgWVKoLox2blMAlK5qK',NULL,'2024-10-27 13:19:08',NULL,NULL),(25,'Antonio Cantuario','antoniocantuario@bjs.uespi.br','$2y$12$pRX8cHP8BtccUOnNwfXGi.z.M/bAysm7abGOK/J1.88NcfIkQT6nC',NULL,1,'2024-10-21 16:30:38','fbx232QxzfYJNWC8B5gyABs8pO0DItDY0C8i1woA01dFrfIk9tanoyh71abJ',NULL,'2024-10-27 13:55:11',NULL,NULL),(26,'Shirlei Marly Alves','shirleimarly@ccm.uespi.br','$2y$12$dGAyVXcGOjyEitg6x9JTye7qUvu4Qs/hL4tIqkEaITRMDBm0E7F/2','https://www.mobifile.com.br/files/webleia/usuarios/bd0302ef3baa7b8d23044aaa45c29591.jpeg',2,'2024-10-27 14:19:38',NULL,'2024-10-27 14:18:46','2024-11-29 18:39:42',NULL,25),(27,'BÁRBARA  MELO','barbaraolimpiam@gmail.com','$2y$12$wDlFVQ0aMBV06MthFRvIMelfafYBTskMZceVy9gbGl611Nl5tuxKi',NULL,2,'2024-10-28 18:09:09',NULL,'2024-10-28 18:08:49','2024-10-28 18:09:09',NULL,27),(28,'ANTONIO ARTUR SILVA CANTUÁRIO','antonioartursilvacantuario@hotmail.com','$2y$12$wjBGWnB2x5yTHIoqs6zVnedKSfMvc.noytjG9Miv9LWrW8ldxSjla',NULL,2,'2024-11-01 19:10:53',NULL,'2024-11-01 19:10:29','2024-11-01 19:10:53',NULL,28),(29,'Franklin Oliveira Silva','franklinolliveira@gmail.com','$2y$12$JwKfUf.awCES7KzwdIP/3eb5V/ealK9C7MKZEBx5JIjPifOyo2mAu',NULL,2,'2024-11-29 19:20:59',NULL,'2024-11-29 19:20:16','2024-11-29 19:20:59',NULL,29),(30,'Marcos Vinícius','marcos.sousa462@gmail.com','$2y$12$.77wCnjMa09ec7iXcGCwle/ONvjWVK8ZH5DTkfYx02XWq.GOB7YZW','https://www.mobifile.com.br/files/webleia/usuarios/2a02d5268a52cfe5ce88576cadab08d1.jpeg',2,'2024-12-04 13:46:50',NULL,'2024-12-04 13:46:00','2024-12-05 18:56:38',NULL,30),(31,'Wallyton Santos','awallytondosss@aluno.uespi.br','$2y$12$X/f8AvjT4G2V8GdWlmhNluaipx6gWH64OoyQivXtLBlCqfsI03/HW','https://www.mobifile.com.br/files/webleia/usuarios/28359a27ceb072858efc02cd39a426bf.jpeg',2,'2024-12-09 17:27:37','puwhzUxzgzKUwrwi1PiJSOmFsiwqwicnHaqD92LW7hmUzDFevbWKnZNJQO2w','2024-12-09 17:24:45','2024-12-09 17:31:30',NULL,31),(32,'Yasmin Lowane','yasminsousa@aluno.uespi.br','$2y$12$wZRuWkHZS2YddFYS1Q4Mqee8FcFUOVbJs2mQsdaEAWVd7vvLPf2Jm','https://www.mobifile.com.br/files/webleia/usuarios/861e9febd787b5846457b1f75b2377f5.jpeg',2,'2024-12-09 17:35:24',NULL,'2024-12-09 17:34:39','2024-12-09 17:39:13',NULL,32),(33,'Expedita Maria Silva feitosa','expedita.maria.s.feitosa@aluno.uespi.br','$2y$12$iH3NyUe5oBD3DOUPUPnlUuU5XnlvL6TOKnLrAyqaTnzYZb7JoUkr.',NULL,2,'2024-12-09 17:35:19',NULL,'2024-12-09 17:35:01','2024-12-09 17:35:19',NULL,33),(34,'Ana Clara Silva Martins','anaclarasilvamartins@aluno.uespi.br','$2y$12$5ytpJwTxZvOlebePwsWHWupDQ/1Vu4YZ3sFHrVctUESTi5sTLY39m','https://www.mobifile.com.br/files/webleia/usuarios/6eed678568205fe96be933ce6cb1e7f5.jpeg',2,'2024-12-09 17:35:22',NULL,'2024-12-09 17:35:04','2024-12-09 17:40:03',NULL,34),(35,'Nayara Lopes Aguiar','nayaralopesa@aluno.uespi.br','$2y$12$2Bv5WT9v7EpZwKa3Xo4RZ.UV4HPwdbDbUhVmxQMIsu.R/eLK.YGae','https://www.mobifile.com.br/files/webleia/usuarios/6d61179cce5925bd33ffa1711b850b0e.jpeg',2,'2024-12-09 17:35:47',NULL,'2024-12-09 17:35:10','2024-12-09 17:38:01',NULL,35),(36,'Expedita Feitosa','expeditamariasilvafeitosa@gmail.com','$2y$12$i1tkxmmrX3dm2BAGKxKuje3rwkJzVExljVCLKkujz0qLVMZWD6a7a',NULL,2,'2024-12-09 17:40:50',NULL,'2024-12-09 17:40:29','2024-12-09 17:40:50',NULL,36),(37,'Cailani Alves de Carvalho','cailanicarvalho0@gmail.com','$2y$12$CM3R/8SusIIYyDiFFx2NxufCUJahg864f7ChgxYSL.Q4HueZYM62W',NULL,2,'2025-01-03 21:40:14',NULL,'2025-01-03 21:39:52','2025-01-03 21:40:14',NULL,37),(38,'Francisco Lucas Oliveira Silva','franciscolucasdev@gmail.com','$2y$12$f4UYgr8N7r1xdJVTlJb6JuYR2k1pIjmttWuQwRgk.BKLJCHOttSEC',NULL,2,'2025-01-07 13:53:17',NULL,'2025-01-07 13:52:45','2025-01-07 13:53:17',NULL,38),(39,'Liedson','liedson.b9@gmail.com','$2y$12$dCV7JpM.5OJmI.D6WB9p.eGoULEDJRheri8lRHjZh9TuzdZceKnhG',NULL,2,'2025-04-03 13:23:32','2025-04-03 13:23:32','2025-04-02 22:28:38','2025-04-02 22:28:38',NULL,39);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 16:11:02
