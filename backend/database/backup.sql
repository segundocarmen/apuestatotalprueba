-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para apuestatotal
CREATE DATABASE IF NOT EXISTS `apuestatotal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `apuestatotal`;

-- Volcando estructura para tabla apuestatotal.access_log
CREATE TABLE IF NOT EXISTS `access_log` (
  `id` varchar(36) NOT NULL,
  `token` mediumtext NOT NULL,
  `local_time` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ab20cb07f35f758733498fe5f36` (`user`),
  CONSTRAINT `FK_ab20cb07f35f758733498fe5f36` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.access_log: ~0 rows (aproximadamente)
INSERT INTO `access_log` (`id`, `token`, `local_time`, `created_at`, `updated_at`, `user`) VALUES
	('0438d0a3-f390-4e85-ada9-948586e44295', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxNjlkMjU3LWQ0MDItNDdjMS1iOGE4LWIyMjg3NjYwMGFiYyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGhvbmUiOiI5MTc0OTEyMDgiLCJzdGF0ZSI6MSwicmVmcmVzaFRva2VuIjpudWxsLCJpc09hdXRoIjpmYWxzZSwiaXNHb29nbGUiOmZhbHNlLCJpc01zIjpmYWxzZSwib2F1dGhJZCI6bnVsbCwiaWF0IjoxNzM0NDc3ODM5LCJleHAiOjE3MzcwNjk4Mzl9.hNjliUgmKiidcNeSvC_aX7K5kmCPSJa6ppiNfqvV24w', '17-12-2024, 6:23:59 p. m.', '2024-12-17 18:23:59.960058', '2024-12-17 18:23:59.960058', '4169d257-d402-47c1-b8a8-b22876600abc');

-- Volcando estructura para tabla apuestatotal.access_log_detail
CREATE TABLE IF NOT EXISTS `access_log_detail` (
  `id` varchar(36) NOT NULL,
  `path` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `access_log` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c12efe6f7eede28a26672b269fb` (`access_log`),
  CONSTRAINT `FK_c12efe6f7eede28a26672b269fb` FOREIGN KEY (`access_log`) REFERENCES `access_log` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.access_log_detail: ~0 rows (aproximadamente)

-- Volcando estructura para tabla apuestatotal.app_section
CREATE TABLE IF NOT EXISTS `app_section` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.app_section: ~4 rows (aproximadamente)
INSERT INTO `app_section` (`id`, `name`, `path`, `state`, `created_at`, `updated_at`) VALUES
	('44f3734f-758f-435b-b9f7-0886e68c1ff4', 'Mi progreso', '/progress', '1', '2024-12-16 10:46:41.214132', '2024-12-16 18:56:41.806492'),
	('8263d118-566f-4bcc-b5a1-cd22a21d861b', 'Mi perfil', '/profile', '1', '2024-12-16 10:46:54.106628', '2024-12-16 18:56:44.600177'),
	('a554d743-525c-4bcd-b45d-1471abe16a0e', 'Registro', '/pokemon-register', '1', '2024-12-16 10:46:28.355953', '2024-12-16 18:56:47.225259'),
	('ce978f22-2a38-4972-9027-747717ccf129', 'Administrar solicitudes', '/dashboard', '1', '2024-12-16 10:46:01.763564', '2024-12-16 18:56:49.558875');

-- Volcando estructura para tabla apuestatotal.app_section_user_role
CREATE TABLE IF NOT EXISTS `app_section_user_role` (
  `app_section` varchar(36) NOT NULL,
  `user_role` varchar(36) NOT NULL,
  PRIMARY KEY (`app_section`,`user_role`),
  KEY `IDX_e4d261688bc9500e97d553e83e` (`app_section`),
  KEY `IDX_494444173f7c5da51ca2f3e8a3` (`user_role`),
  CONSTRAINT `FK_494444173f7c5da51ca2f3e8a3c` FOREIGN KEY (`user_role`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e4d261688bc9500e97d553e83e1` FOREIGN KEY (`app_section`) REFERENCES `app_section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.app_section_user_role: ~4 rows (aproximadamente)
INSERT INTO `app_section_user_role` (`app_section`, `user_role`) VALUES
	('44f3734f-758f-435b-b9f7-0886e68c1ff4', 'b130bf0e-9d38-42d3-9285-86e381458c9d'),
	('8263d118-566f-4bcc-b5a1-cd22a21d861b', 'b130bf0e-9d38-42d3-9285-86e381458c9d'),
	('a554d743-525c-4bcd-b45d-1471abe16a0e', 'b130bf0e-9d38-42d3-9285-86e381458c9d'),
	('ce978f22-2a38-4972-9027-747717ccf129', '6e5323d9-428c-4ad9-92c0-6db7dfea7dca');

-- Volcando estructura para tabla apuestatotal.medal_sequence
CREATE TABLE IF NOT EXISTS `medal_sequence` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `count` int(11) NOT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.medal_sequence: ~9 rows (aproximadamente)
INSERT INTO `medal_sequence` (`id`, `name`, `count`, `state`, `created_at`, `updated_at`) VALUES
	('1db94c76-7459-4b92-a8c0-2466c5565fa2', 'PLATINIUM', 85, '1', '2024-12-16 04:24:49.323656', '2024-12-16 04:24:49.323656'),
	('2b608ff7-51b0-46af-aaa0-3a9a0b40f663', 'HIERRO', 15, '1', '2024-12-16 04:24:10.822448', '2024-12-16 04:24:10.822448'),
	('3e31bc66-9bc1-4b53-bfff-3e5dabd79bd8', 'ORO', 60, '1', '2024-12-16 04:24:37.509701', '2024-12-16 04:24:37.509701'),
	('5e4839ac-fe4c-41a3-927a-e9e2a104cd83', 'BRONCE', 25, '1', '2024-12-16 04:24:19.826410', '2024-12-16 04:24:19.826410'),
	('7d4794bf-7765-4f1d-80e0-dbe7a2d8fe17', 'DIAMANTE', 115, '1', '2024-12-16 04:24:59.907561', '2024-12-16 04:24:59.907561'),
	('922d41a7-a8bc-4d40-b57c-409a6e6fc7ff', 'RADIANTE', 190, '1', '2024-12-16 04:25:19.853280', '2024-12-16 04:25:19.853280'),
	('c3a65d11-3c57-450d-ad20-25f0d14a4755', 'INMORTAL', 150, '1', '2024-12-16 04:25:08.345577', '2024-12-16 04:25:08.345577'),
	('d4824d9e-f0fe-4629-9c46-616c06d19f83', 'MADERA', 10, '1', '2024-12-16 04:23:38.395262', '2024-12-16 04:23:38.395262'),
	('d7164409-d27c-4627-89d8-b4456b325750', 'PLATA', 40, '1', '2024-12-16 04:24:29.322423', '2024-12-16 04:24:29.322423');

-- Volcando estructura para tabla apuestatotal.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `complete_name` varchar(255) NOT NULL,
  `doc_type` enum('DNI','RUC','CEX') NOT NULL DEFAULT 'DNI',
  `doi` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `activation_token` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `refresh_token` mediumtext DEFAULT NULL,
  `is_oauth` tinyint(4) DEFAULT NULL,
  `is_google` tinyint(4) DEFAULT NULL,
  `is_ms` tinyint(4) DEFAULT NULL,
  `oauth_id` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `role` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `IDX_1f2c31911e3b5b4681fbc04971` (`activation_token`),
  UNIQUE KEY `IDX_5b494fc54a2e3d122f17b39359` (`reset_password_token`),
  KEY `FK_6620cd026ee2b231beac7cfe578` (`role`),
  CONSTRAINT `FK_6620cd026ee2b231beac7cfe578` FOREIGN KEY (`role`) REFERENCES `user_role` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.user: ~3 rows (aproximadamente)
INSERT INTO `user` (`id`, `complete_name`, `doc_type`, `doi`, `email`, `password`, `phone`, `address`, `state`, `activation_token`, `reset_password_token`, `refresh_token`, `is_oauth`, `is_google`, `is_ms`, `oauth_id`, `created_at`, `updated_at`, `role`) VALUES
	('4169d257-d402-47c1-b8a8-b22876600abc', 'Admin 1', 'DNI', '45854745', 'admin@gmail.com', '$2b$10$ls6ixaAU99oi/s9oDrHS.OcN7kTCsp.yo68ibb5LaO9pOH/ZCOb92', '917491208', 'Jr Killke 1774 Urb Mangomarca - SJL', '1', 'b10e7b5a-2939-4d18-862a-b4ea5e01fa2b', NULL, NULL, 0, 0, 0, NULL, '2024-12-13 04:51:59.944792', '2024-12-17 18:23:43.953705', '6e5323d9-428c-4ad9-92c0-6db7dfea7dca'),
	('f0fbf361-3fb0-4307-9c30-3a3726d660bd', 'User 2', 'DNI', '85693251', 'user2@gmail.com', '$2b$10$2fy5UwUGI8IiklbesKaIQepkO36cbh228es0MQvqLjooUEic7BZPC', '917491208', 'xxxxxxxx', '1', '84d8f0ab-b935-411c-814a-eaa16641b2fc', NULL, NULL, 0, 0, 0, NULL, '2024-12-16 20:21:19.486636', '2024-12-17 18:23:34.141578', 'b130bf0e-9d38-42d3-9285-86e381458c9d'),
	('f7906120-4a6e-46fa-a54c-151cc1383974', 'User 1', 'DNI', '74585455', 'user1@gmail.com', '$2b$10$3.TakLS.TICYMS7xufbUWuJVKTaBXekNDrrDSql1iIIg6s/sv39LW', '917491208', 'xxxxxxxx', '1', '62a91e8d-4cf9-49bb-b04f-f01d811aaca6', NULL, NULL, 0, 0, 0, NULL, '2024-12-16 18:51:21.975214', '2024-12-17 18:23:38.665112', 'b130bf0e-9d38-42d3-9285-86e381458c9d');

-- Volcando estructura para tabla apuestatotal.user_pokemon_register
CREATE TABLE IF NOT EXISTS `user_pokemon_register` (
  `id` varchar(36) NOT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user` varchar(36) DEFAULT NULL,
  `accepted` enum('PENDIENTE','ACEPTADO','DENEGADO') NOT NULL DEFAULT 'PENDIENTE',
  `registered_count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_9fa16cf94a043e28912660d76c8` (`user`),
  CONSTRAINT `FK_9fa16cf94a043e28912660d76c8` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.user_pokemon_register: ~0 rows (aproximadamente)

-- Volcando estructura para tabla apuestatotal.user_pokemon_register_detail
CREATE TABLE IF NOT EXISTS `user_pokemon_register_detail` (
  `id` varchar(36) NOT NULL,
  `pokemon_id` varchar(255) NOT NULL,
  `pokemon_name` varchar(255) NOT NULL,
  `pokemon_power` int(11) NOT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `user_pokemon_register` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4cc990154bd9727c14c210026e6` (`user_pokemon_register`),
  CONSTRAINT `FK_4cc990154bd9727c14c210026e6` FOREIGN KEY (`user_pokemon_register`) REFERENCES `user_pokemon_register` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.user_pokemon_register_detail: ~0 rows (aproximadamente)

-- Volcando estructura para tabla apuestatotal.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `initial_section` varchar(255) NOT NULL,
  `state` enum('1','0') NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla apuestatotal.user_role: ~2 rows (aproximadamente)
INSERT INTO `user_role` (`id`, `name`, `initial_section`, `state`, `created_at`, `updated_at`) VALUES
	('6e5323d9-428c-4ad9-92c0-6db7dfea7dca', 'Admin', 'xxxxxxxxxx', '1', '2024-12-13 04:47:29.824202', '2024-12-13 04:47:29.824202'),
	('b130bf0e-9d38-42d3-9285-86e381458c9d', 'ClasicUser', 'xxxxxxxxxx', '1', '2024-12-13 04:48:28.483660', '2024-12-13 04:48:28.483660');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
