-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2022 at 05:29 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinema_db`
--
CREATE DATABASE IF NOT EXISTS `cinema_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `cinema_db`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `sdt` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `activated` bit(1) DEFAULT b'0',
  `activate_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`username`, `firstname`, `lastname`, `email`, `sdt`, `password`, `activated`, `activate_token`) VALUES
('tronghien', 'Nguyen', 'Hien', 'tronghien123654@gmail.com', '0949993438', '$2y$10$UA6d8dqFhh5T1WWWNZGeDetmVrMw8rGwndxxQijdKfBdte8z4l9wm', b'1', '123456'),
('tronghien0403', 'Trong', 'Hien', 'incognito.designoop@gmail.com', '0913546545', '$2y$10$GnjHVHKq8o6IvvZHb7zUU.3/rd4xITyk3xz78PdXnyjbeiC2qR87y', b'1', ''),
('haidang', 'Nguyen', 'Dang', 'nchdang16012001@gmail.com', '0395675163', '$2y$10$ptIrb3mN3v6kYUp67TZPvu1zkF7B/pz7mB08VtQK86e.W6/fOf8Fi', b'1', '');

-- --------------------------------------------------------

--
-- Table structure for table `bookingtable`
--

CREATE TABLE `bookingtable` (
  `bookingID` int(11) NOT NULL,
  `movieName` varchar(100) DEFAULT NULL,
  `bookingTheatre` varchar(100) NOT NULL,
  `bookingDate` varchar(50) NOT NULL,
  `bookingTime` varchar(50) NOT NULL,
  `bookingFName` varchar(100) NOT NULL,
  `bookingLName` varchar(100) DEFAULT NULL,
  `bookingPNumber` varchar(12) NOT NULL,
  `paymentStatus` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookingtable`
--

INSERT INTO `bookingtable` (`bookingID`, `movieName`, `bookingTheatre`, `bookingDate`, `bookingTime`, `bookingFName`, `bookingLName`, `bookingPNumber`, `paymentStatus`) VALUES
(34, 'Shang-Chi', 'Main Hall', '2-1-2022', '12-00', 'Nguyen', 'Dang', '0395675163', 1),
(36, 'Black Panther', 'Main Hall', '2-1-2022', '12-00', 'Nguyen', 'Dang', '0395675163', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `job` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `phone`, `job`, `gender`) VALUES
(1, 'Nguyen Cao Hai Dang', '908665356', 'receptionist', 'Male'),
(2, 'Nguyen Le Thu', '394564152', 'sell food', 'Female'),
(4, 'Nguyen Bi', '397891425', 'receptionist', 'Male'),
(5, 'Nguyen Kien', '1234567890', 'sell food drinks', 'Male'),
(6, 'Bibipiqwe', '0908577787', 'seller pop', 'male'),
(7, 'Nguyen bo', '09084571452', 'sell', 'male'),
(8, 'Hien Nguyen', '0949993438', 'CEO ', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `hall`
--

CREATE TABLE `hall` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `chairs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hall`
--

INSERT INTO `hall` (`id`, `name`, `chairs`) VALUES
(0, 'Main Hall', 100),
(1, 'VIP Halll', 200),
(2, 'Hall Premium', 10),
(3, 'A Hall', 123);

-- --------------------------------------------------------

--
-- Table structure for table `movietable`
--

CREATE TABLE `movietable` (
  `movieID` int(11) NOT NULL,
  `movieImg` varchar(150) NOT NULL,
  `movieTitle` varchar(100) NOT NULL,
  `movieGenre` varchar(50) NOT NULL,
  `movieDuration` int(11) NOT NULL,
  `movieRelDate` date NOT NULL,
  `movieDirector` varchar(50) NOT NULL,
  `movieActors` varchar(150) NOT NULL,
  `ticketPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movietable`
--

INSERT INTO `movietable` (`movieID`, `movieImg`, `movieTitle`, `movieGenre`, `movieDuration`, `movieRelDate`, `movieDirector`, `movieActors`, `ticketPrice`) VALUES
(23, 'img/movie-poster-1.jpg', 'Hawkeye', 'Action, Scienfic', 180, '2021-03-23', 'Marvel', 'Jeremy Renner, Troy Baker, Tody Diniel', 30000),
(24, 'img/movie-poster-2.jpg', 'Ant Man', 'Action, Comedy', 200, '2021-03-02', 'Marvel', 'Paul Rudd, Stan Lee, T.I', 20000),
(25, 'img/movie-poster-3.jpg', 'Shang-Chi', 'Superhero', 250, '2021-03-09', 'Marvel', 'Simu Liu, Awkquafina, Fala Chen', 25000),
(26, 'img/movie-poster-4.jpg', 'Black Panther', 'Action, Adventure', 190, '2021-03-14', 'Marvel', 'Chadwick BoseMan, Michael Jordan B', 35000),
(27, 'img/movie-poster-5.jpg', 'Guardians of Galaxy', 'Action, Crime', 220, '2021-03-11', 'Marvel', 'Josh Brolyn, Diane Lane', 50000),
(28, 'img/movie-poster-6.jpg', 'Captain Marvel', 'Action, Adventure', 250, '2021-03-20', 'Marvel', 'Brie Larson, Samuel L Jackson', 35000);

-- --------------------------------------------------------

--
-- Table structure for table `reset_token`
--

CREATE TABLE `reset_token` (
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expire_on` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookingtable`
--
ALTER TABLE `bookingtable`
  ADD PRIMARY KEY (`bookingID`),
  ADD UNIQUE KEY `bookingID` (`bookingID`),
  ADD KEY `bookingID_2` (`bookingID`),
  ADD KEY `bookingID_3` (`bookingID`),
  ADD KEY `bookingID_4` (`bookingID`);

--
-- Indexes for table `movietable`
--
ALTER TABLE `movietable`
  ADD PRIMARY KEY (`movieID`),
  ADD UNIQUE KEY `movieID` (`movieID`);

--
-- Indexes for table `reset_token`
--
ALTER TABLE `reset_token`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingtable`
--
ALTER TABLE `bookingtable`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `movietable`
--
ALTER TABLE `movietable`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
