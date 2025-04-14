# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 45.79.76.221 (MySQL 5.7.20-0ubuntu0.16.04.1)
# Base de Dados: livros360_dev
# Tempo de Geração: 2018-04-17 11:06:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela instituicao_ensino
# ------------------------------------------------------------

LOCK TABLES `instituicao_ensino` WRITE;
/*!40000 ALTER TABLE `instituicao_ensino` DISABLE KEYS */;

DELETE FROM `instituicao_ensino`;

INSERT INTO `instituicao_ensino` (`id`, `nome`, `sigla`, `inep`, `cidade_id`, `created_at`, `updated_at`)
VALUES
    (373, 'UNIVERSIDADE ESTADUAL DO PIAUÍ', 'UESPI', 756, 2211001, null, null),
    (857, 'INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO PIAUÍ', 'IFPI', 1820, 2211001, null, null),
    (5, 'UNIVERSIDADE FEDERAL DO PIAUÍ', 'UFPI', 5, 2211001, null, null);

/*!40000 ALTER TABLE `instituicao_ensino` ENABLE KEYS */;
UNLOCK TABLES;

/*!40000 ALTER TABLE `instituicao_ensino` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
