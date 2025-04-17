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
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2019_12_14_000001_create_personal_access_tokens_table',1),(2,'2024_09_16_143728_create_table_usuario',1),(3,'2024_09_16_143733_create_table_aplicacao',1),(4,'2024_09_16_143745_create_table_aplicacao_configuracao',1),(5,'2024_09_16_143753_create_table_aplicacao_acesso_token',1),(6,'2024_09_16_143756_create_table_aplicacao_acesso_log',1),(7,'2024_09_16_145914_create_data_ini_users',1),(8,'2024_09_16_163333_create_grau_instrucaos_table',1),(9,'2024_09_16_163350_create_instituicao_ensinos_table',1),(10,'2024_09_16_163351_create_alunos_table',1),(11,'2024_09_16_164354_add_aluno_table_usuarios',1),(12,'2024_09_16_171958_create_tipo_textos_table',1),(13,'2024_09_17_075914_create_data_ini_aplicacao',1),(14,'2024_09_18_103354_create_anexos_table',1),(15,'2024_09_18_114732_create_categoria_perguntas_table',1),(16,'2024_09_18_114742_create_perguntas_table',1),(17,'2024_09_19_111109_create_producao_textuals_table',2),(18,'2024_09_19_111130_create_producao_textual_respostas_table',2),(19,'2024_09_19_111253_add_descricao_genero_textual',2),(20,'2024_09_23_075400_add_cor_categoria_pergunta',1),(21,'2024_09_23_075401_add_num_palavras_genero_textual',1),(22,'2024_09_23_080000_create_cidades_table',3),(23,'2024_09_23_080004_populate_cidades',3),(24,'2024_09_23_080100_add_campos_instuicao_ensino',3),(25,'2024_09_23_111412_add_cpf_aluno',4),(26,'2024_09_23_080100_add_campos_pergunta',4),(27,'2024_09_23_111542_add_status_producao_textual',5),(28,'2024_09_23_111543_add_uso_texto_final_resposta',6),(29,'2024_09_27_171552_add_num_palavras_producao_textual',7),(30,'2024_09_27_175848_create_password_reset_tokens_table',7),(31,'2024_09_30_174615_add_num_palavras_resposta',8),(32,'2024_10_03_091553_add_min_max_genero_textual',9),(33,'2024_10_03_094255_add_min_max_producao_textual',10),(34,'2024_10_03_143327_add_genero_textual_categoria_pergunta',11),(35,'2024_10_09_081051_add_flag_publicado_genero_textual',12),(36,'2024_10_09_153534_add_resposta_texto_final_pergunta',13),(37,'2024_10_14_074703_add_tipo_pergunta',14),(38,'2024_10_14_075057_create_item_perguntas_table',14);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 16:09:39
