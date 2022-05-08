-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2022 at 12:11 PM
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
-- Database: `esdc_cinema`
--
CREATE DATABASE IF NOT EXISTS `esdc_cinema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `esdc_cinema`;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `email`, `password`) VALUES
(5, 'admin', 'admin@gmail.com', '$2b$10$juTZdCXGGLUEgCbu1zPH7OCgqH241FbX8GAWTmA89/FqILsoChHZa');

-- --------------------------------------------------------

--
-- Table structure for table `billdetail`
--

CREATE TABLE `billdetail` (
  `idbilldetail` int(11) NOT NULL,
  `idsp` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `idve` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `billdetail`
--

INSERT INTO `billdetail` (`idbilldetail`, `idsp`, `quantity`, `idve`) VALUES
(1, 2, 1, 12),
(2, 3, 1, 12),
(3, 1, 1, 12),
(4, 3, 1, 20),
(5, 2, 1, 22),
(6, 2, 1, 23),
(7, 3, 1, 24),
(8, 2, 1, 61),
(9, 3, 1, 61),
(10, 3, 1, 62),
(11, 4, 1, 62),
(12, 3, 1, 63),
(13, 3, 2, 63),
(14, 3, 1, 64),
(15, 1, 1, 64),
(16, 1, 2, 64),
(17, 2, 1, 64),
(18, 2, 2, 64),
(19, 4, 1, 64),
(20, 4, 2, 64),
(21, 4, 3, 64),
(22, 4, 4, 64),
(23, 3, 2, 64),
(24, 2, 1, 65),
(25, 2, 2, 65),
(26, 3, 1, 65),
(27, 3, 2, 65),
(28, 2, 1, 66),
(29, 2, 2, 66),
(30, 4, 1, 66),
(31, 4, 2, 66),
(32, 2, 1, 67),
(33, 2, 2, 67),
(34, 3, 1, 67),
(35, 3, 2, 67),
(36, 2, 2, 68),
(37, 3, 2, 68),
(38, 3, 2, 69),
(39, 4, 2, 69),
(40, 3, 1, 71),
(41, 4, 1, 71);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `idkh` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`idkh`, `name`, `gender`, `phone`, `email`, `password`, `points`) VALUES
(2, 'Nguyen Dang', 'male', 395675163, 'imdang@gmail.com', '$2b$10$C8qUs37Hs//UVtd2mmmZuOx7DT5Qwj48V7xgLNZKE62WGRk82sNPe', 0),
(3, 'Trong Hien', 'male', 908577456, 'tronghien@mail.com', '$2b$10$Vp7HD6VIN02/3t0/NmlXG.bl2qzncUjl1sFZD.wwPWWZd2EVZ/hp.', 0),
(4, 'Gia Bao', 'male', 92789456, 'giabao@mail.com', '$2b$10$Or1BO4ma16xFjNTmUZSM5O7FNHRVvlTLEE8M7pEgI1RizHLdbfiXO', 0),
(5, 'Thu Ngan', 'female', 908665345, 'thungan@mail.com', '$2b$10$.VK3DVlZec81r..P8SQVnehko3vWmY5nFoTLsLyxwxw4Ekm23vBiy', 0),
(6, 'admin2', 'male', 908577456, 'admin2@gmail.com', '$2b$10$uyc64ep3xsoG7DkqUQNVdOPrR9EEXMVYZhwgxci1FEyzkwAK5ghgC', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `idnv` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`idnv`, `name`, `phone`, `gender`, `role`) VALUES
(1, 'haidang', 908577456, 'Male', 'receptionist'),
(2, 'tronghiennnn', 123456, 'Female', 'abcqwe'),
(3, 'tronghien', 908123456, 'Female', 'supporter'),
(4, 'thungan', 908789456, 'Female', 'supporter');

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `numrow` int(11) NOT NULL,
  `numcolumn` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`id`, `numrow`, `numcolumn`) VALUES
(1, 10, 11),
(2, 15, 20),
(3, 11, 19),
(5, 3, 4),
(6, 2, 4),
(7, 4, 5),
(8, 5, 14);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `idphim` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `overview` varchar(2000) NOT NULL,
  `vote_average` float NOT NULL,
  `release_date` date NOT NULL,
  `poster_path` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`idphim`, `title`, `overview`, `vote_average`, `release_date`, `poster_path`, `duration`) VALUES
(1, 'Spider Man', 'Parents need to know that Spider-Man: No Way Home is the third Spider-Man movie starring Tom Holland and the 27th movie in the Marvel Cinematic Universe (MCU). Its fun, funny, exciting, suspenseful, surprising, and very moving and is sure to please Spidey fans. Violence includes a lot of comic book-style fighting and peril, with characters getting slammed and bashed around, falling from high places, etc. Theres punching, choking, kicking, explosions, bloody cuts and scrapes, and brief guns and shooting. ', 8, '2021-04-08', '1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', 120),
(2, 'Encanto', 'Parents need to know that Encanto is an animated Disney musical set in Colombia and featuring Mirabel Madrigal (voiced by Stephanie Beatriz), the youngest granddaughter in a family that protects their enchanted village with the magical powers theyve had for two generations ... except for Mirabel. As she helps her cousin prepare for his coming-of-magical-age ritual, she begins to question her role in the family. Expect a few scenes of violence: Mirabels grandfather is killed by armed men (the actual death isnt shown), and supernatural events and catastrophes threaten the characters. Theres also mild name-calling and affection between married characters. ', 8, '2021-04-16', '4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg', 130),
(3, 'Sonic', 'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.', 7.5, '2021-03-10', '6DrHO1jr3qVrViUO6s6kFiAGM7.jpg', 140),
(4, 'Yaksha', 'Nicknamed after a human-devouring spirit, the ruthless leader of an overseas black ops team takes up a dangerous mission in a city riddled with spies.', 7.7, '2022-04-01', '7MDgiFOPUCeG74nQsMKJuzTJrtc.jpg', 150),
(5, 'Batman', 'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.', 8, '2022-04-14', '74xTEgt7R36Fpooo50r9T25onhq.jpg', 100),
(6, 'BlackLight', 'Travis Block is a government operative coming to terms with his shadowy past. When he discovers a plot targeting U.S. citizens, Block finds himself in the crosshairs of the FBI director he once helped protect.', 7.7, '2022-03-18', 'bv9dy8mnwftdY2j6gG39gCfSFpV.jpg', 130);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `idtin` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `day` date NOT NULL,
  `content` varchar(2000) NOT NULL,
  `picture_path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`idtin`, `title`, `day`, `content`, `picture_path`) VALUES
(1, 'Movie Super easy job earns 10 billion VND a day', '2022-05-01', 'The work received a partial response because there were no competing Vietnamese films. In the first six hours of screening, the film sold 15,000 tickets. The work reached the milestone of 55,000 tickets after the second day. Currently, the new project of the couple Thu Trang - Tien Luat has reached 33 billion dong, thanks to its early screening a week before the official date of April 29. The work is expected to lead the box office after four days of holiday.', 'nghe-sieu-de-1-1653-1651380404.jpg'),
(3, 'Behind the scenes of Hua Vi Van fighting on the boat', '2022-05-01', 'The behind-the-scenes video posted on the morning of April 30 revealed the most dramatic part of the work. The crew filmed at sea from 7:00 p.m. to 3:00 a.m. the next morning, for three consecutive nights. Hua Vi Van - as Thai, a retired police officer and Tien Luat - as Hoang, a drug lord, rehearsed weeks in advance to prepare the scene. However, when filming, the actors were still exhausted when they had to endure strong winds and waves. They both tried to avoid seasickness and focused to strike.', 'hua-vi-van-1-4524-1651296448.jpg'),
(16, 'Chris Pratt rescues dinosaurs in new trailer', '2022-05-01', 'Jurassic World: Dominion is set four years after the destruction of the island of Isla Nublar. The dinosaurs now live and hunt right next to the human world. After genetic modification, they become extremely diverse and dangerous. Despite the ability to communicate with dinosaurs through gestures, Owen Grady has many difficulties when constantly encountering these dangerous individuals on his journey to save Beta.', '2512100om0320compv1109353gr709444048r-1651207046892228014786.jpg'),
(17, 'Andrew Garfield to stop acting', '2022-05-01', 'The actor feels fortunate to be able to think about taking a break despite working in a highly competitive field. He said he was inspired by stars such as rappers Kendrick Lamar, Simone Biles, who are willing to stop working even at their peak, only coming back when they feel ready.  Garfield also doesnt have many plans for the break. He wants to travel but is too lazy to get on a plane. \"I probably just want to lie down, not think and watch my colleagues works, listen to music, have fun with friends or eat a burger. You know, to live like a normal person,\" the actor said. added.', 'Andrew-Garfield-7312-1651116113.jpg'),
(18, 'Avatar 2 reveals first footage', '2022-05-01', 'Part two of Avatar is scheduled to be released in December, 13 years after the first part. Three sequels are also planned for production, slated to release in 2024, 2026 and 2028 respectively. The cost of four parts is about a billion dollars. The project takes time for underwater shots as well as motion-capture technology (actors play with motion capture devices attached to their bodies, then their movements and expressions will be combined with special effects. to create movie scenes).', 'Avatar-2-James-Cameron-5081-1651112580.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `priceticket`
--

CREATE TABLE `priceticket` (
  `idprice_ticket` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `priceticket`
--

INSERT INTO `priceticket` (`idprice_ticket`, `price`) VALUES
(1, 90000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `idsp` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `picture_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`idsp`, `price`, `name`, `picture_path`) VALUES
(1, 50000, 'Popcorn Caramel', 'bap-caramel.jpg'),
(2, 40000, 'Popcorn Cheese', 'bap-pho-mai.jpg'),
(3, 60000, 'BigShare Popcorn Drinks', 'big-share.jpg'),
(4, 55000, 'Share Popcorn Drinks', 'share.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `idkm` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `day` date NOT NULL,
  `content` varchar(1000) NOT NULL,
  `note` varchar(2000) NOT NULL,
  `picture_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`idkm`, `title`, `day`, `content`, `note`, `picture_path`) VALUES
(30, 'THURSDAY A LOVE DAY', '2022-05-05', '\"Sweet Thursday\" with a super sweet offer: \"Free refill of water engine when buying 2 tickets and water\".', 'Note: Free refill of corn water once per transaction. Not valid for online ticket purchases. Not valid in conjunction with other promotions in theaters.', 'cinema-3d-movie-background-with-popcorn-vintage-film_53562-5483 (1).jpg'),
(33, 'TUSEDAY A GOOD DAY', '2022-05-03', '\"Happy Tuesday\" super hot offer: \"Combo 89k - 1 ticket and 1 corn\".', 'Note: Applicable to all showings of the day. Not valid for online ticket purchases. ', 'colorful-design-movie-poster-popcorn-glasses-blue-pink-background-bokeh-lights-vivid-cinema-promotion-118386622.jpg'),
(34, 'MONDAY A FUN DAY', '2022-05-02', '\"Happy Monday\" with a very fun offer \"Buy 2 Get 1\". When you buy any 2 movie tickets, you get 1 big bag of corn for free.', 'Note: Applicable to all showings of the day. Not valid for online ticket purchases. ', 't4sna-art-05-promotion-banner-cinema3d-vector-illustration-by-t4sna.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `idphongchieu` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `idmap` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`idphongchieu`, `name`, `idmap`) VALUES
(1, 'Screen 1', 3),
(2, 'Screen 2', 1),
(3, 'Screen 3', 2),
(4, 'Screen 4', 1),
(5, 'Screen 5', 2),
(6, 'Screen 6', 3),
(8, 'screen1234', 23);

-- --------------------------------------------------------

--
-- Table structure for table `showtime`
--

CREATE TABLE `showtime` (
  `idsuatchieu` int(11) NOT NULL,
  `start` time NOT NULL,
  `day` date NOT NULL,
  `idphim` int(11) NOT NULL,
  `idphongchieu` int(11) NOT NULL,
  `seatmap` varchar(2000) NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `showtime`
--

INSERT INTO `showtime` (`idsuatchieu`, `start`, `day`, `idphim`, `idphongchieu`, `seatmap`) VALUES
(1, '14:00:00', '2022-05-18', 4, 3, '[]'),
(2, '17:00:00', '2022-05-18', 4, 3, '[]'),
(3, '21:00:00', '2022-05-18', 4, 3, '[]'),
(4, '23:00:00', '2022-05-18', 4, 3, '[]'),
(5, '14:00:00', '2022-05-19', 4, 3, '[]'),
(6, '17:00:00', '2022-05-19', 4, 3, '[]'),
(7, '21:00:00', '2022-05-19', 4, 3, '[]'),
(8, '23:00:00', '2022-05-19', 4, 3, '[]'),
(9, '14:00:00', '2022-05-20', 4, 3, '[]'),
(10, '17:00:00', '2022-05-20', 4, 3, '[]'),
(11, '21:00:00', '2022-05-20', 4, 3, '[]'),
(12, '23:00:00', '2022-05-20', 4, 3, '[]'),
(13, '09:00:00', '2022-05-18', 5, 2, '[]'),
(14, '12:00:00', '2022-05-18', 5, 2, '[]'),
(15, '15:00:00', '2022-05-18', 5, 2, '[]'),
(16, '09:00:00', '2022-05-19', 5, 2, '[]'),
(17, '12:00:00', '2022-05-19', 5, 2, '[]'),
(18, '15:00:00', '2022-05-19', 5, 2, '[]'),
(19, '09:00:00', '2022-05-20', 5, 2, '[]'),
(20, '12:00:00', '2022-05-20', 5, 2, '[]'),
(21, '15:00:00', '2022-05-20', 5, 2, '[]'),
(22, '09:00:00', '2022-05-18', 1, 1, '[]'),
(23, '12:00:00', '2022-05-18', 1, 1, '[]'),
(24, '15:00:00', '2022-05-18', 1, 1, '[]'),
(25, '18:00:00', '2022-05-18', 1, 1, '[]'),
(26, '21:00:00', '2022-05-18', 1, 1, '[]'),
(27, '09:00:00', '2022-05-19', 1, 1, '[]'),
(28, '12:00:00', '2022-05-19', 1, 1, '[]'),
(29, '15:00:00', '2022-05-19', 1, 1, '[]'),
(30, '18:00:00', '2022-05-19', 1, 1, '[]'),
(31, '21:00:00', '2022-05-19', 1, 1, '[]'),
(32, '10:00:00', '2022-05-18', 2, 4, '[]'),
(33, '13:00:00', '2022-05-18', 2, 4, '[]'),
(34, '16:00:00', '2022-05-18', 2, 4, '[]'),
(35, '22:00:00', '2022-05-18', 2, 4, '[]'),
(36, '10:00:00', '2022-05-19', 2, 4, '[]'),
(37, '13:00:00', '2022-05-19', 2, 4, '[]'),
(38, '16:00:00', '2022-05-19', 2, 4, '[]'),
(39, '22:00:00', '2022-05-19', 2, 4, '[]'),
(40, '10:00:00', '2022-05-20', 2, 4, '[]'),
(41, '13:00:00', '2022-05-20', 2, 4, '[]'),
(42, '16:00:00', '2022-05-20', 2, 4, '[28,30]'),
(43, '22:00:00', '2022-05-20', 2, 4, '[]'),
(44, '10:00:00', '2022-05-21', 2, 4, '[]'),
(45, '13:00:00', '2022-05-21', 2, 4, '[]'),
(46, '16:00:00', '2022-05-21', 2, 4, '[]'),
(47, '22:00:00', '2022-05-21', 2, 4, '[]'),
(48, '10:00:00', '2022-05-18', 3, 5, '[]'),
(49, '13:00:00', '2022-05-18', 3, 5, '[]'),
(50, '16:00:00', '2022-05-18', 3, 5, '[]'),
(51, '22:00:00', '2022-05-18', 3, 5, '[]'),
(52, '10:00:00', '2022-05-19', 3, 5, '[]'),
(53, '13:00:00', '2022-05-19', 3, 5, '[]'),
(54, '16:00:00', '2022-05-19', 3, 5, '[]'),
(55, '22:00:00', '2022-05-19', 3, 5, '[]'),
(56, '12:00:00', '2022-05-18', 6, 6, '[]'),
(57, '15:00:00', '2022-05-18', 6, 6, '[]'),
(58, '18:00:00', '2022-05-18', 6, 6, '[]'),
(59, '21:00:00', '2022-05-18', 6, 6, '[]'),
(60, '12:00:00', '2022-05-19', 6, 6, '[]'),
(61, '15:00:00', '2022-05-19', 6, 6, '[]'),
(62, '18:00:00', '2022-05-19', 6, 6, '[]'),
(63, '22:00:00', '2022-05-22', 2, 2, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `idve` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `idsuatchieu` int(11) NOT NULL,
  `idkh` int(11) NOT NULL,
  `seat` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`idve`, `price`, `status`, `idsuatchieu`, `idkh`, `seat`) VALUES
(71, 295000, 0, 42, 4, 'C7,C9');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billdetail`
--
ALTER TABLE `billdetail`
  ADD PRIMARY KEY (`idbilldetail`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`idkh`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`idnv`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`idphim`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`idtin`);

--
-- Indexes for table `priceticket`
--
ALTER TABLE `priceticket`
  ADD PRIMARY KEY (`idprice_ticket`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idsp`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`idkm`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`idphongchieu`);

--
-- Indexes for table `showtime`
--
ALTER TABLE `showtime`
  ADD PRIMARY KEY (`idsuatchieu`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`idve`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `billdetail`
--
ALTER TABLE `billdetail`
  MODIFY `idbilldetail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `idkh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `idnv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `idphim` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `idtin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `priceticket`
--
ALTER TABLE `priceticket`
  MODIFY `idprice_ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `idsp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `idkm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `idphongchieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `showtime`
--
ALTER TABLE `showtime`
  MODIFY `idsuatchieu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `idve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
