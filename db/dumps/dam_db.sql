-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-server:3306
-- Tiempo de generación: 24-11-2024 a las 22:54:29
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.2.8
CREATE DATABASE IF NOT EXISTS dam_db;

USE dam_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Data base: `dam_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Dispositivos`
--

CREATE TABLE `Dispositivos` (
  `dispositivoId` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `electrovalvulaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Dispositivos`
--

INSERT INTO `Dispositivos` (`dispositivoId`, `nombre`, `ubicacion`, `electrovalvulaId`) VALUES
(1, 'Sensor 1', 'Lote 1', 1),
(2, 'Sensor 2', 'Lote 2', 2),
(3, 'Sensor 3', 'Lote 3', 3),
(4, 'Sensor 4', 'Lote 4', 4),
(5, 'Sensor 5', 'Lote 5', 5),
(6, 'Sensor 6', 'Lote 6', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Electrovalvulas`
--

CREATE TABLE `Electrovalvulas` (
  `electrovalvulaId` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Electrovalvulas`
--

INSERT INTO `Electrovalvulas` (`electrovalvulaId`, `nombre`) VALUES
(1, 'eL_Lote1'),
(2, 'eL_Lote2'),
(3, 'eL_Lote3'),
(4, 'eL_Lote4'),
(5, 'eL_Lote5'),
(6, 'eL_Lote6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Log_Riegos`
--

CREATE TABLE `Log_Riegos` (
  `logRiegoId` int(11) NOT NULL,
  `apertura` tinyint(4) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `electrovalvulaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mediciones`
--

CREATE TABLE `Mediciones` (
  `medicionId` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `valor` varchar(100) DEFAULT NULL,
  `dispositivoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Mediciones`
--

INSERT INTO `Mediciones` (`medicionId`, `fecha`, `valor`, `dispositivoId`) VALUES
(1, '2024-12-01 12:00:10', '60', 1),
(2, '2024-12-01 12:00:10', '40', 1),
(3, '2024-12-01 12:00:10', '30', 2),
(4, '2024-12-01 12:00:10', '50', 3),
(5, '2024-12-01 12:00:10', '33', 5),
(6, '2024-12-01 12:00:10', '17', 4),
(7, '2024-12-01 12:00:10', '29', 6),
(8, '2024-12-01 12:00:10', '20', 1),
(9, '2024-12-01 12:00:10', '44', 4),
(10, '2024-12-01 12:00:10', '61', 5),
(11, '2024-12-01 12:00:10', '12', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Dispositivos`
--
ALTER TABLE `Dispositivos`
  ADD PRIMARY KEY (`dispositivoId`,`electrovalvulaId`),
  ADD KEY `fk_Dispositivos_Electrovalvulas1_idx` (`electrovalvulaId`);

--
-- Indices de la tabla `Electrovalvulas`
--
ALTER TABLE `Electrovalvulas`
  ADD PRIMARY KEY (`electrovalvulaId`);

--
-- Indices de la tabla `Log_Riegos`
--
ALTER TABLE `Log_Riegos`
  ADD PRIMARY KEY (`logRiegoId`,`electrovalvulaId`),
  ADD KEY `fk_Log_Riegos_Electrovalvulas1_idx` (`electrovalvulaId`);

--
-- Indices de la tabla `Mediciones`
--
ALTER TABLE `Mediciones`
  ADD PRIMARY KEY (`medicionId`,`dispositivoId`),
  ADD KEY `fk_Mediciones_Dispositivos_idx` (`dispositivoId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Dispositivos`
--
ALTER TABLE `Dispositivos`
  MODIFY `dispositivoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Electrovalvulas`
--
ALTER TABLE `Electrovalvulas`
  MODIFY `electrovalvulaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Log_Riegos`
--
ALTER TABLE `Log_Riegos`
  MODIFY `logRiegoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Mediciones`
--
ALTER TABLE `Mediciones`
  MODIFY `medicionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Dispositivos`
--
ALTER TABLE `Dispositivos`
  ADD CONSTRAINT `fk_Dispositivos_Electrovalvulas1` FOREIGN KEY (`electrovalvulaId`) REFERENCES `Electrovalvulas` (`electrovalvulaId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Log_Riegos`
--
ALTER TABLE `Log_Riegos`
  ADD CONSTRAINT `fk_Log_Riegos_Electrovalvulas1` FOREIGN KEY (`electrovalvulaId`) REFERENCES `Electrovalvulas` (`electrovalvulaId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Mediciones`
--
ALTER TABLE `Mediciones`
  ADD CONSTRAINT `fk_Mediciones_Dispositivos` FOREIGN KEY (`dispositivoId`) REFERENCES `Dispositivos` (`dispositivoId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
