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
-- Table structure for table `genero_textual`
--

DROP TABLE IF EXISTS `genero_textual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero_textual` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_palavras` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `min_palavras` smallint unsigned NOT NULL DEFAULT '0',
  `max_palavras` smallint unsigned NOT NULL DEFAULT '0',
  `use_min_max` smallint unsigned NOT NULL DEFAULT '0',
  `publicado` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero_textual`
--

LOCK TABLES `genero_textual` WRITE;
/*!40000 ALTER TABLE `genero_textual` DISABLE KEYS */;
INSERT INTO `genero_textual` VALUES (1,'Resenha',500,NULL,'2024-12-05 21:22:17',NULL,'<p>Uma resenha acadêmica é uma análise crítica que descreve e avalia produtos culturais, artísticos, científicos etc,  dentro de um contexto específico. Esse gênero se caracteriza por apresentar descrições e sínteses avaliativas, apresentando o produto para o  leitor. A resenha não se limita a um resumo do conteúdo, mas expande-se para incluir uma avaliação sobre o conteúdo abordado, o estilo e outras características da obra resenhada, destacando ainda sua relevância na área em que se insere.<br>A resenha é um gênero acadêmico que possibilita o diálogo entre diferentes autores e obras,  exigindo do resenhista não apenas a compreensão do texto original, mas também a capacidade de relacioná-lo com outros trabalhos, teorias e contextos,  bem como evidenciando sua importância no debate científico. Assim, a resenha tem seus dizeres potencializados pelos procedimentos da intertextualidade e da interdisciplinaridade, essenciais para o dinamismo da produção de saberes nas variadas ciências.<br>Do ponto de vista processual, a elaboração de uma resenha envolve etapas que vão desde a leitura atenta e analítica da obra até a expressão de um julgamento crítico fundamentado. Nesse processo, algumas  habilidades  são mobilizadas, como o poder de síntese, de análise e de avaliação crítica, indispensáveis para estudantes, professores e comunidade acadêmica em geral. A prática de resenhar estimula o pensamento crítico, aprofundando o conhecimento em determinada área e aprimorando a capacidade de argumentação necessária à escrita científica engajada e produtiva.<br>Para a comunidade acadêmica, a resenha é de suma importância, pois contribui para o desenvolvimento e a disseminação da ciência. Para estudantes, é uma forma de participação ativa com o material estudado, promovendo a aprendizagem e o desenvolvimento intelectual. Para professores, representa um recurso didático valioso, capaz de instigar o pensamento crítico e a capacidade analítica dos discentes, além de ser um meio para se manterem atualizados nas suas áreas de especialização. Desse modo, esse gênero é um artefato essencial na dinâmica da pesquisa, do aprendizado acadêmico, ou seja, dos letramentos acadêmicos como práticas situadas a serviço da produção de sentidos e significados que movem o agir científico, acadêmico e pedagógico.</p>',400,1500,0,1),(2,'Resumo informativo',300,NULL,'2024-10-28 23:20:16','2024-10-28 23:20:16','<p>O resumo informativo acadêmico é um gênero textual que condensa de forma objetiva e precisa os aspectos essenciais de uma pesquisa ou documento, facilitando a rápida compreensão do seu conteúdo. Desse modo,  resumo acadêmico informativo é uma síntese objetiva e concisa de uma pesquisa ou texto, funcionando para a disseminação rápida de trabalhos científicos.<br>De modo conceitual, o resumo representa um exercício de reflexão e síntese, demandando a habilidade de comunicar claramente o essencial da pesquisa, incluindo seu propósito, metodologia, resultados e conclusões. De modo processual, a produção do resumo informativo envolve a compreensão e aplicação de estratégias textuais específicas, garantindo uma comunicação eficaz e a fidelidade ao conteúdo original.</p>',100,300,1,1),(3,'teste',0,'2024-10-14 23:01:31','2024-11-28 19:01:09','2024-11-28 19:01:09',NULL,1,4,1,0),(4,'Resumo informativo',0,'2024-10-15 00:07:41','2025-04-16 12:51:13',NULL,'<p><strong>RESUMO INFORMATIVO</strong></p>\n<p><strong>Definição:</strong></p>\n<p>O resumo informativo acadêmico é um gênero textual que condensa de forma objetiva e precisa os aspectos essenciais de uma pesquisa ou documento, facilitando a rápida compreensão do seu conteúdo retórico.</p>\n<p>De modo fatual, o resumo acadêmico informativo é uma síntese objetiva e concisa de uma pesquisa ou texto, funcionando para a disseminação rápida de trabalhos científicos.</p>\n<p>De modo conceitual, o resumo representa um exercício de reflexão e síntese, demandando a habilidade de comunicar claramente o essencial da pesquisa, incluindo seu propósito, metodologia, resultados e conclusões, além de refletir sobre o conhecimento e a retórica envolvida.</p>\n<p>De modo processual, a criação do resumo informativo envolve a compreensão e aplicação de passos específicos, garantindo uma comunicação mais eficiente e a fidelidade ao conteúdo original, além de promover uma interação produtiva com o leitor.&nbsp;</p>\n<p>O que você verá com a terminologia <strong>Movimento </strong>refere-se a uma etapa da função comunicativa, guiando o sentido e os objetivos do resumo. Já para a terminologia <strong>Passo</strong>, o termo consiste no processo informativo mais específico que visa cumprir a função de dizer aquilo que se comunica, ajudando a alcançar os objetivos de comunicação dos <strong>Movimentos</strong>.</p>',25,550,1,1),(5,'Mínimo de Palavras (COM EDIÇÃO)',0,'2024-10-21 14:11:56','2024-10-21 15:05:47',NULL,'<ul>\n<li style=\"margin-left:1.5em;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: medium;font-family: Roboto, Helvetica, Arial, sans-serif;\"><strong>Passo 1:</strong><strong><ins> Leitura Inicial</ins></strong></span><br><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: medium;font-family: Roboto, Helvetica, Arial, sans-serif;\">Leia o conteúdo completo uma vez, sem se preocupar em anotar nada. </span><br><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: medium;font-family: Roboto, Helvetica, Arial, sans-serif;\">O objetivo é ter uma visão geral do assunto.</span> <br>&nbsp;</li>\n<li><strong> Passo 2: Leitura Atenta</strong><br>Leia novamente o material, desta vez prestando atenção nos pontos principais.<br>Sublinhe ou destaque partes importantes, como conceitos, definições, datas, eventos e ideias centrais.</li>\n</ul>\n<p></p>\n<ul>\n<li><strong>Passo 3: Identificação das Ideias Centrais</strong></li>\n</ul>\n<p>Identifique o que é realmente essencial. Busque as ideias centrais de cada parágrafo ou seção. <br>Elas são os fundamentos do conteúdo que você precisa lembrar.</p>\n<p></p>\n<ul>\n<li><strong>Passo 4: Parafrasear as Ideias</strong></li>\n</ul>\n<p>Reescreva os pontos principais com suas próprias palavras. <br>Isso ajuda a garantir que você realmente compreendeu o material.</p>\n<p></p>\n<ul>\n<li><strong>Passo 5: Organização do Resumo</strong></li>\n</ul>\n<p>Organize seu resumo de forma lógica:</p>\n<p>- **Título:** Dê um título ao resumo para facilitar a identificação do tema.</p>\n<p>- **Subtítulos:** Use subtítulos para dividir os tópicos. Isso facilita a leitura e a revisão.</p>\n<p>- **Frases curtas:** Prefira frases objetivas. Evite incluir exemplos longos ou detalhes excessivos.</p>\n<p></p>\n<ul>\n<li><strong> Passo 6: Revisão</strong></li>\n</ul>\n<p>Leia seu resumo para se certificar de que capturou os principais pontos.<br> Se necessário, ajuste o texto para deixá-lo mais claro e conciso.</p>\n<p></p>\n<p><strong>### Dicas Extras:</strong></p>\n<p>- **Seja breve:** Um resumo deve ser conciso e ir direto ao ponto.</p>\n<p>- **Evite copiar partes do texto original:** Parafrasear é essencial para fixar o aprendizado.</p>\n<p>- **Inclua termos e definições importantes.**</p>\n<p>- **Utilize esquemas visuais (como mapas mentais ou quadros) para ajudar na organização.**</p>',5,30,1,1),(6,'Novo Texto',0,'2024-10-21 17:42:55','2024-10-28 17:44:28',NULL,'<p>aaaaaabbbbbbcccc</p>',1,20,0,1),(7,'RESUMO',0,'2024-10-27 13:57:31','2024-11-28 19:01:38','2024-11-28 19:01:38',NULL,100,500,1,0),(8,'RESENHA 1',0,'2024-10-27 14:23:24','2024-11-28 19:01:29','2024-11-28 19:01:29',NULL,400,1500,1,0),(9,'Resumo teste',0,'2024-10-31 12:00:07','2024-11-28 19:01:01','2024-11-28 19:01:01',NULL,200,450,1,0),(10,'gênero resumo',0,'2024-11-15 13:58:01','2024-11-15 14:01:30','2024-11-15 14:01:30',NULL,100,500,1,1),(11,'gênero resumo',0,'2024-11-15 16:55:31','2024-11-28 19:00:25','2024-11-28 19:00:25',NULL,100,500,1,1),(12,'gênero resumo',0,'2024-11-15 16:56:10','2024-11-28 19:00:39','2024-11-28 19:00:39',NULL,100,500,1,1),(13,'gênero resumo',0,'2024-11-15 16:57:15','2024-11-28 19:00:52','2024-11-28 19:00:52',NULL,100,500,1,1),(14,'teste renato',0,'2024-11-29 18:53:02','2024-11-29 18:53:02',NULL,NULL,10,100,1,0),(15,'gênero resumo',0,'2024-11-29 18:53:15','2024-11-29 18:53:15',NULL,NULL,100,250,1,0),(16,'Alcemir',0,'2024-12-04 19:10:35','2024-12-04 19:10:35',NULL,NULL,100,500,1,0),(17,'MobiDemo',0,'2024-12-09 10:56:47','2024-12-09 11:03:37',NULL,'<p>99</p>',1,10000,1,1);
/*!40000 ALTER TABLE `genero_textual` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-16 16:10:37
