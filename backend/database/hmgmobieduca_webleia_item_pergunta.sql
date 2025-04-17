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
-- Table structure for table `item_pergunta`
--

DROP TABLE IF EXISTS `item_pergunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_pergunta` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ordem` tinyint unsigned NOT NULL,
  `pergunta_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_pergunta_pergunta_id_foreign` (`pergunta_id`),
  CONSTRAINT `item_pergunta_pergunta_id_foreign` FOREIGN KEY (`pergunta_id`) REFERENCES `pergunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pergunta`
--

LOCK TABLES `item_pergunta` WRITE;
/*!40000 ALTER TABLE `item_pergunta` DISABLE KEYS */;
INSERT INTO `item_pergunta` VALUES (1,'Submissão de comunicação oral ou em pôster em evento acadêmico',1,39),(2,'Compor parte de projeto de pesquisa',2,39),(3,'Resumir relatório para participar de evento de iniciação científica',3,39),(4,'Compor parte do trabalho completo em anais de eventos',4,39),(5,'Compor parte de artigo em periódico ou revista ',5,39),(6,'Compor parte pré-textual de trabalho de conclusão de curso – TCC (Graduação)',6,39),(7,'Compor parte pré-textual de monografia (Especialização)',7,39),(8,'Compor parte pré-textual da dissertação (Mestrado)',8,39),(9,'Compor parte pré-textual da tese (Doutorado)',9,39),(10,'Outro',10,39),(11,'Submeter proposta de comunicação oral ou em pôster em evento acadêmico',1,47),(12,'Compor parte de projeto de pesquisa',1,47),(13,'Resumir relatório para participar de evento de iniciação científica',1,47),(17,'Feito',1,50),(18,'Em andamento',1,50),(19,'Não iniciado',1,50),(20,'Incluido termos e definições importantes.',1,51),(21,'Utilizado Esquemas Visuais',1,51),(22,'Feito',1,59),(23,'Revisando',1,59),(24,'Não iniciado',1,59),(25,'Alternativa 1',1,60),(26,'Alternativa 2',1,60),(27,'Alternativa 3',1,60),(28,'Alternativa 4',1,60),(29,'Alternativa 1',1,62),(30,'Alternativa 2',1,62),(31,'Alternativa 3',1,62),(32,'Compor parte do trabalho completo em anais de eventos',1,47),(33,'Compor parte de artigo em periódico ou revista',1,47),(34,'Compor parte pré-textual de trabalho de conclusão de curso – TCC (Graduação)',1,47),(35,'Compor parte pré-textual de monografia (Especialização)',1,47),(36,'Compor parte pré-textual da dissertação (Mestrado)',1,47),(37,'Compor parte pré-textual da tese (Doutorado)',1,47),(38,'Outro',1,47),(39,'Alternativa 1',1,84),(40,'Alternativa 2',1,84),(41,'Alternativa 3',1,84),(42,'Alternativa 4',1,84),(43,'Alternativa 1',1,85),(44,'Alternativa 2',1,85),(45,'Alternativa 3',1,85),(46,'Alternativa 4',1,85);
/*!40000 ALTER TABLE `item_pergunta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 16:10:06
