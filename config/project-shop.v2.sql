-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2021 at 07:07 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blogId` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bonus`
--

CREATE TABLE `bonus` (
  `bonusId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commentId` varchar(20) NOT NULL,
  `content` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detailbonus`
--

CREATE TABLE `detailbonus` (
  `id` int(11) NOT NULL,
  `discountPrice` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `bonusId` int(11) DEFAULT NULL,
  `productId` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detailcart`
--

CREATE TABLE `detailcart` (
  `id` int(11) NOT NULL,
  `productId` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `listCartId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detailcart`
--

INSERT INTO `detailcart` (`id`, `productId`, `quantity`, `Price`, `createdAt`, `updatedAt`, `listCartId`) VALUES
(1, 'NP1000-04E', 1, 18100000, '2021-03-24 18:02:11', '2021-03-24 18:02:11', 1),
(2, 'DW00500002', 1, 5000000, '2021-03-24 18:05:57', '2021-03-24 18:05:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `detailproduct`
--

CREATE TABLE `detailproduct` (
  `id` int(11) NOT NULL,
  `madeIn` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `quality` varchar(50) DEFAULT NULL,
  `function` varchar(100) DEFAULT NULL,
  `machine` varchar(100) DEFAULT NULL,
  `strap` varchar(100) DEFAULT NULL,
  `waterproof` varchar(10) DEFAULT NULL,
  `size` float DEFAULT NULL,
  `thickness` float DEFAULT NULL,
  `guarantee` int(11) DEFAULT NULL,
  `productId` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detailproduct`
--

INSERT INTO `detailproduct` (`id`, `madeIn`, `color`, `quality`, `function`, `machine`, `strap`, `waterproof`, `size`, `thickness`, `guarantee`, `productId`, `createdAt`, `updatedAt`) VALUES
(1, 'nhật bản', 'Màu trắng', ' 5 sao', 'Lịch Ngày – Lịch Thứ – Đồng Hồ 24h', 'Quartz (Pin)', 'Dây Da  Chính Hãng', '5 ATM', 42, 13, 12, 'MTP-1374L-7AVDF', '2020-11-16 17:24:21', '2020-11-16 17:24:21'),
(2, 'nhật bản', 'Màu vàng hồng', ' 5 sao', 'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác', 'Quartz (Pin)', 'Dây kim loại', '5 ATM', 43.1, 10.5, 12, 'B650WC-5ADF', '2020-11-16 17:35:01', '2020-11-16 17:35:01'),
(3, 'nhật bản', 'Màu trắng bạc', '5 sao', 'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác', 'Quartz (Pin)', 'Dây kim loại', '5 ATM', 43.1, 10.5, 12, 'B650WD-1ADF', '2020-11-16 17:37:32', '2020-11-16 17:37:32'),
(5, 'nhật bản', 'Màu đen', '5 sao', 'Lịch – Bộ Bấm Giờ – Giờ Kép – Đèn Led – Vài Chức Năng Khác', 'Quartz (Pin)', 'Dây Da Chính Hãng', '5 ATM', 43, 10.4, 12, 'MTP-1374L-1AVDF', '2020-11-16 17:48:41', '2020-11-16 17:48:41'),
(7, 'nhật bản', 'Màu đen', '5 sao', 'Lịch Ngày – Lịch Thứ- Đồng hồ 24h\n', 'Quartz (Pin)', 'Dây Kim Loại', '5 ATM', 43, 12, 12, 'MTP-1374D-1AVDF', '2020-11-16 18:01:16', '2020-11-16 18:01:16'),
(8, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Chronograph', 'Quartz (Pin)', 'Dây Kim Loại', '5 ATM', 43.8, 11.6, 12, 'EFV-570D-7AVUDF', '2020-11-16 18:04:38', '2020-11-16 18:04:38'),
(9, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Chronograph', 'Quartz (Pin)', 'Dây Kim Loại', '10 ATM', 43.8, 12.1, 12, 'EFV-540D-7AVUDF', '2020-11-16 18:07:12', '2020-11-16 18:07:12'),
(10, 'nhật bản', 'Màu hồng', '5 sao', 'Lịch Ngày', 'Quartz (Pin)', 'Dây Kim Loại', '5 ATM', 31.2, 8.7, 12, 'LTP-1308D-4AVDF', '2020-11-16 18:11:24', '2020-11-16 18:11:24'),
(11, 'nhật bản', 'Màu vàng', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '5 ATM', 26, 7.3, 12, 'LTP-E402G-9AVDF', '2020-11-16 18:14:30', '2020-11-16 18:14:30'),
(12, 'nhật bản', 'Màu đen', '5 sao', 'Lịch Ngày', 'Quartz (Pin)', 'Dây Da chính hãng', '5 ATM', 40, 9.5, 12, 'MTP-E149L-1BVDF', '2020-11-16 18:18:20', '2020-11-16 18:18:20'),
(13, 'nhật bản', 'Màu xanh dương', '5 sao', 'Lịch Ngày', 'Quartz (Pin)', 'Dây Da chính hãng', '8 ATM', 47, 9.5, 12, 'MTP-E149L-2BVDF', '2020-11-16 18:21:58', '2020-11-16 18:21:58'),
(14, 'nhật bản', 'Màu đen', '5 sao', 'Lịch Ngày', 'Quartz (Pin)', 'Dây Kim loại', '5 ATM', 50, 13, 12, 'MTP-1374D-2A', '2020-11-16 18:24:58', '2020-11-16 18:24:58'),
(15, 'nhật bản', 'Màu trawnsg', '5 sao', 'Lịch Ngày – Lịch Thứ – Đồng hồ 24h', 'Quartz (Pin)', 'Dây Kim loại', '5 ATM', 43.5, 13.5, 12, 'MTP-1374D-7AVDF', '2020-11-16 18:27:34', '2020-11-16 18:27:34'),
(16, 'nhật bản', 'Màu đen', '5 sao', 'Lịch Ngày – Lịch Thứ – Lịch Tháng', 'Automatic (Tự Động)', 'Dây Da Chính Hãng', '5 ATM', 45, 13, 12, 'NP1000-04E', '2020-11-16 18:54:46', '2020-11-16 18:54:46'),
(17, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Lịch Thứ – Lịch Tháng', 'Quartz (Pin)', 'Thép Không Gỉ', '5 ATM', 39, 8, 12, 'BE9174-55A', '2020-11-18 15:38:07', '2020-11-18 15:38:07'),
(18, 'nhật bản', 'Màu đen', '5 sao', 'Lịch Ngày ', 'Eco-Drive (Năng Lượng Ánh Sáng)', 'Thép Không Gỉ', '5 ATM', 26, 7, 12, 'EW1580-50E', '2020-11-18 15:42:14', '2020-11-18 15:42:14'),
(19, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày ', 'Eco-Drive (Năng Lượng Ánh Sáng)', 'Dây Da chính hãng', '3 ATM', 28, 7, 12, 'EW1582-03A', '2020-11-18 15:44:59', '2020-11-18 15:44:59'),
(20, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày ', 'Eco-Drive (Năng Lượng Ánh Sáng)', 'Thép Không Gỉ', '3 ATM', 36, 8, 12, 'BM6774-51A', '2020-11-18 15:51:02', '2020-11-18 15:51:02'),
(22, 'nhật bản', 'Màu đen', '5 sao', 'Lịch thứ', 'Quartz (Pin)', 'Thép Không Gỉ', '5 ATM', 40, 9, 12, 'BE9170-56E', '2020-11-18 16:01:29', '2020-11-18 16:01:29'),
(23, 'nhật bản', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Thép Không Gỉ', '5 ATM', 39, 8, 12, 'EJ6134-50A', '2020-11-18 16:07:11', '2020-11-18 16:07:11'),
(24, 'nhật bản', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Thép Không Gỉ', '3 ATM', 30, 7, 12, 'EJ6130-51E', '2020-11-18 16:11:50', '2020-11-18 16:11:50'),
(26, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Lịch Thứ – Lịch Tháng', 'Eco-Drive (Năng lượng ánh sáng)', 'Thép Không Gỉ', '5 ATM', 42, 8, 12, 'BL9000-83E', '2020-11-18 16:24:52', '2020-11-18 16:24:52'),
(27, 'nhật bản', 'Màu trắng', '5 sao', 'Đồng Hồ 24 Giờ', 'Automatic (Tự Động)', 'Dây Da Chính Hãng', '5 ATM', 40, 10.7, 12, 'NP1020-15A', '2020-11-18 16:28:56', '2020-11-18 16:28:56'),
(28, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Lịch Thứ – Lịch Tháng', 'Automatic (Cơ Tự Động)', 'Thép Không Gỉ', '5 ATM', 45, 12, 12, 'NB2010-58A', '2020-11-18 16:32:19', '2020-11-18 16:32:19'),
(29, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày – Lịch Thứ – Lịch Tháng-Đồng hồ 24h', 'Eco-Drive', 'Dây da chính hãng', '5 ATM', 40, 8, 12, 'BJ7010-24W', '2020-11-18 16:37:24', '2020-11-18 16:37:24'),
(30, 'nhật bản', 'Màu trắng', '5 sao', 'Lịch Ngày', 'Eco-Drive (Năng Lượng Ánh Sáng)', 'Thép Không Gỉ', '5 ATM', 41, 9.6, 12, 'AW1370-51M', '2020-11-18 16:40:36', '2020-11-18 16:40:36'),
(31, 'Thụy Điển', 'Màu đen', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 32, 6, 12, 'DW00100161', '2020-11-18 17:05:33', '2020-11-18 17:05:33'),
(32, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 32, 6, 24, 'DW00100163', '2020-11-18 17:08:46', '2020-11-18 17:08:46'),
(33, 'Thụy Điển', 'Màu đen', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 32, 6, 24, 'DW00100162', '2020-11-19 04:55:58', '2020-11-19 04:55:58'),
(34, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 32, 6, 24, 'DW00100164', '2020-11-19 04:58:07', '2020-11-19 04:58:07'),
(35, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 32, 6, 24, 'DW00100201', '2020-11-19 05:03:07', '2020-11-19 05:03:07'),
(36, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây Kim Loại', '3 ATM', 28, 6, 24, 'DW00100246', '2020-11-19 05:04:22', '2020-11-19 05:04:22'),
(37, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây vãi + Dây da chính hãng', '3 ATM', 40, 6, 24, 'DW00500002', '2020-11-19 05:07:46', '2020-11-19 05:07:46'),
(38, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây vãi + Dây da chính hãng', '3 ATM', 28, 6, 24, 'DW00100239', '2020-11-19 15:55:28', '2020-11-19 15:55:28'),
(39, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây vãi + Dây da chính hãng', '3 ATM', 40, 6, 24, 'DW00100086', '2020-11-19 16:08:31', '2020-11-19 16:08:31'),
(40, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây vãi + Dây da chính hãng', '3 ATM', 32, 6, 24, 'DW00100186', '2020-11-19 16:12:56', '2020-11-19 16:12:56'),
(41, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây da chính hãng', '3 ATM', 40, 6, 24, 'DW00100021', '2020-11-19 16:17:03', '2020-11-19 16:17:03'),
(42, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'Dây kim loai hoặc dây vãi', '3 ATM', 28, 6, 24, 'DW00100248', '2020-11-19 16:20:10', '2020-11-19 16:20:10'),
(43, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'dây vãi', '3 ATM', 36, 6, 24, 'DW00100260', '2020-11-19 16:22:49', '2020-11-19 16:22:49'),
(44, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'dây vãi', '3 ATM', 40, 6, 24, 'DW00100257', '2020-11-19 16:26:28', '2020-11-19 16:26:28'),
(45, 'Thụy Điển', 'Màu trắng', '5 sao', '', 'Quartz (Pin)', 'dây vãi', '3 ATM', 28, 6, 24, 'DW00100228', '2020-11-19 16:28:37', '2021-03-04 07:01:39'),
(51, 'Nhật Bản', 'Màu đen', '5 sao', 'Lịch – Bộ Bấm Giờ – Đèn Led – Vài Chức Năng Khác', 'Quartz (Pin)', 'Dây Cao Su', '20 ATM', 50, 16, 24, 'DW-6900', '2021-03-12 14:37:22', '2021-03-12 14:37:22');

-- --------------------------------------------------------

--
-- Table structure for table `imageproduct`
--

CREATE TABLE `imageproduct` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `productId` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imageproduct`
--

INSERT INTO `imageproduct` (`id`, `path`, `productId`, `createdAt`, `updatedAt`) VALUES
(1, 'CASIO-B650WC-5ADF-1616342253412', 'B650WC-5ADF', '2021-03-21 15:57:35', '2021-03-21 15:57:35'),
(2, 'CASIO-B650WC-5ADF-1616342253414', 'B650WC-5ADF', '2021-03-21 15:57:35', '2021-03-21 15:57:35'),
(3, 'CASIO-B650WC-5ADF-1616342253413', 'B650WC-5ADF', '2021-03-21 15:57:35', '2021-03-21 15:57:35'),
(4, 'CASIO-B650WC-5ADF-1616342253415', 'B650WC-5ADF', '2021-03-21 15:57:38', '2021-03-21 15:57:38'),
(5, 'CASIO-B650WD-1ADF-1616342444176', 'B650WD-1ADF', '2021-03-21 16:00:45', '2021-03-21 16:00:45'),
(6, 'CASIO-B650WD-1ADF-1616342444178', 'B650WD-1ADF', '2021-03-21 16:00:46', '2021-03-21 16:00:46'),
(7, 'CASIO-B650WD-1ADF-1616342444179', 'B650WD-1ADF', '2021-03-21 16:00:47', '2021-03-21 16:00:47'),
(8, 'CASIO-B650WD-1ADF-1616342444177', 'B650WD-1ADF', '2021-03-21 16:00:48', '2021-03-21 16:00:48'),
(9, 'CASIO-EFV-540D-7AVUDF-1616342533840', 'EFV-540D-7AVUDF', '2021-03-21 16:02:15', '2021-03-21 16:02:15'),
(10, 'CASIO-EFV-540D-7AVUDF-1616342533841', 'EFV-540D-7AVUDF', '2021-03-21 16:02:15', '2021-03-21 16:02:15'),
(11, 'CASIO-EFV-540D-7AVUDF-1616342533839', 'EFV-540D-7AVUDF', '2021-03-21 16:02:15', '2021-03-21 16:02:15'),
(12, 'CASIO-EFV-540D-7AVUDF-1616342533842', 'EFV-540D-7AVUDF', '2021-03-21 16:02:16', '2021-03-21 16:02:16'),
(13, 'CASIO-EFV-570D-7AVUDF-1616342575332', 'EFV-570D-7AVUDF', '2021-03-21 16:02:56', '2021-03-21 16:02:56'),
(14, 'CASIO-EFV-570D-7AVUDF-1616342575330', 'EFV-570D-7AVUDF', '2021-03-21 16:02:56', '2021-03-21 16:02:56'),
(15, 'CASIO-EFV-570D-7AVUDF-1616342575329', 'EFV-570D-7AVUDF', '2021-03-21 16:02:56', '2021-03-21 16:02:56'),
(16, 'CASIO-EFV-570D-7AVUDF-1616342575331', 'EFV-570D-7AVUDF', '2021-03-21 16:02:57', '2021-03-21 16:02:57'),
(17, 'CASIO-LTP-1308D-4AVDF-1616342696286', 'LTP-1308D-4AVDF', '2021-03-21 16:04:58', '2021-03-21 16:04:58'),
(18, 'CASIO-LTP-1308D-4AVDF-1616342696287', 'LTP-1308D-4AVDF', '2021-03-21 16:04:58', '2021-03-21 16:04:58'),
(19, 'CASIO-LTP-1308D-4AVDF-1616342696288', 'LTP-1308D-4AVDF', '2021-03-21 16:04:58', '2021-03-21 16:04:58'),
(20, 'CASIO-LTP-1308D-4AVDF-1616342696289', 'LTP-1308D-4AVDF', '2021-03-21 16:04:59', '2021-03-21 16:04:59'),
(21, 'CASIO-LTP-E402G-9AVDF-1616342725173', 'LTP-E402G-9AVDF', '2021-03-21 16:05:26', '2021-03-21 16:05:26'),
(22, 'CASIO-LTP-E402G-9AVDF-1616342725174', 'LTP-E402G-9AVDF', '2021-03-21 16:05:26', '2021-03-21 16:05:26'),
(23, 'CASIO-LTP-E402G-9AVDF-1616342725175', 'LTP-E402G-9AVDF', '2021-03-21 16:05:26', '2021-03-21 16:05:26'),
(24, 'CASIO-LTP-E402G-9AVDF-1616342725172', 'LTP-E402G-9AVDF', '2021-03-21 16:05:26', '2021-03-21 16:05:26'),
(25, 'CASIO-MTP-1374D-1AVDF-1616342782639', 'MTP-1374D-1AVDF', '2021-03-21 16:06:24', '2021-03-21 16:06:24'),
(26, 'CASIO-MTP-1374D-1AVDF-1616342782640', 'MTP-1374D-1AVDF', '2021-03-21 16:06:24', '2021-03-21 16:06:24'),
(27, 'CASIO-MTP-1374D-1AVDF-1616342782641', 'MTP-1374D-1AVDF', '2021-03-21 16:06:25', '2021-03-21 16:06:25'),
(28, 'CASIO-MTP-1374D-1AVDF-1616342782638', 'MTP-1374D-1AVDF', '2021-03-21 16:06:25', '2021-03-21 16:06:25'),
(29, 'CASIO-MTP-1374D-2A-1616342820223', 'MTP-1374D-2A', '2021-03-21 16:07:01', '2021-03-21 16:07:01'),
(30, 'CASIO-MTP-1374D-2A-1616342820224', 'MTP-1374D-2A', '2021-03-21 16:07:02', '2021-03-21 16:07:02'),
(31, 'CASIO-MTP-1374D-2A-1616342820225', 'MTP-1374D-2A', '2021-03-21 16:07:02', '2021-03-21 16:07:02'),
(32, 'CASIO-MTP-1374D-2A-1616342820226', 'MTP-1374D-2A', '2021-03-21 16:07:02', '2021-03-21 16:07:02'),
(33, 'CASIO-MTP-1374D-7AVDF-1616342850247', 'MTP-1374D-7AVDF', '2021-03-21 16:07:31', '2021-03-21 16:07:31'),
(34, 'CASIO-MTP-1374D-7AVDF-1616342850249', 'MTP-1374D-7AVDF', '2021-03-21 16:07:32', '2021-03-21 16:07:32'),
(35, 'CASIO-MTP-1374D-7AVDF-1616342850250', 'MTP-1374D-7AVDF', '2021-03-21 16:07:32', '2021-03-21 16:07:32'),
(36, 'CASIO-MTP-1374D-7AVDF-1616342850248', 'MTP-1374D-7AVDF', '2021-03-21 16:07:32', '2021-03-21 16:07:32'),
(37, 'CASIO-MTP-1374L-1AVDF-1616342926716', 'MTP-1374L-1AVDF', '2021-03-21 16:08:48', '2021-03-21 16:08:48'),
(38, 'CASIO-MTP-1374L-1AVDF-1616342926713', 'MTP-1374L-1AVDF', '2021-03-21 16:08:48', '2021-03-21 16:08:48'),
(39, 'CASIO-MTP-1374L-1AVDF-1616342926715', 'MTP-1374L-1AVDF', '2021-03-21 16:08:48', '2021-03-21 16:08:48'),
(40, 'CASIO-MTP-1374L-1AVDF-1616342926717', 'MTP-1374L-1AVDF', '2021-03-21 16:08:48', '2021-03-21 16:08:48'),
(41, 'CASIO-MTP-1374L-1AVDF-1616342926714', 'MTP-1374L-1AVDF', '2021-03-21 16:08:50', '2021-03-21 16:08:50'),
(42, 'CASIO-MTP-1374L-7AVDF-1616342994782', 'MTP-1374L-7AVDF', '2021-03-21 16:09:56', '2021-03-21 16:09:56'),
(43, 'CASIO-MTP-1374L-7AVDF-1616342994784', 'MTP-1374L-7AVDF', '2021-03-21 16:09:56', '2021-03-21 16:09:56'),
(44, 'CASIO-MTP-1374L-7AVDF-1616342994785', 'MTP-1374L-7AVDF', '2021-03-21 16:09:56', '2021-03-21 16:09:56'),
(45, 'CASIO-MTP-1374L-7AVDF-1616342994783', 'MTP-1374L-7AVDF', '2021-03-21 16:09:56', '2021-03-21 16:09:56'),
(46, 'CASIO-MTP-E149L-1BVDF-1616343039061', 'MTP-E149L-1BVDF', '2021-03-21 16:10:40', '2021-03-21 16:10:40'),
(47, 'CASIO-MTP-E149L-1BVDF-1616343039063', 'MTP-E149L-1BVDF', '2021-03-21 16:10:40', '2021-03-21 16:10:40'),
(48, 'CASIO-MTP-E149L-1BVDF-1616343039064', 'MTP-E149L-1BVDF', '2021-03-21 16:10:40', '2021-03-21 16:10:40'),
(49, 'CASIO-MTP-E149L-1BVDF-1616343039062', 'MTP-E149L-1BVDF', '2021-03-21 16:10:40', '2021-03-21 16:10:40'),
(50, 'CASIO-MTP-E149L-2BVDF-1616343066943', 'MTP-E149L-2BVDF', '2021-03-21 16:11:08', '2021-03-21 16:11:08'),
(51, 'CASIO-MTP-E149L-2BVDF-1616343066946', 'MTP-E149L-2BVDF', '2021-03-21 16:11:08', '2021-03-21 16:11:08'),
(52, 'CASIO-MTP-E149L-2BVDF-1616343066944', 'MTP-E149L-2BVDF', '2021-03-21 16:11:09', '2021-03-21 16:11:09'),
(53, 'CASIO-MTP-E149L-2BVDF-1616343066945', 'MTP-E149L-2BVDF', '2021-03-21 16:11:11', '2021-03-21 16:11:11'),
(54, 'CITIZEN-AW1370-51M-1616343191165', 'AW1370-51M', '2021-03-21 16:13:13', '2021-03-21 16:13:13'),
(55, 'CITIZEN-AW1370-51M-1616343191163', 'AW1370-51M', '2021-03-21 16:13:13', '2021-03-21 16:13:13'),
(56, 'CITIZEN-AW1370-51M-1616343191162', 'AW1370-51M', '2021-03-21 16:13:14', '2021-03-21 16:13:14'),
(57, 'CITIZEN-AW1370-51M-1616343191164', 'AW1370-51M', '2021-03-21 16:13:16', '2021-03-21 16:13:16'),
(58, 'CITIZEN-BE9170-56E-1616343253559', 'BE9170-56E', '2021-03-21 16:14:15', '2021-03-21 16:14:15'),
(59, 'CITIZEN-BE9170-56E-1616343253560', 'BE9170-56E', '2021-03-21 16:14:15', '2021-03-21 16:14:15'),
(60, 'CITIZEN-BE9170-56E-1616343253558', 'BE9170-56E', '2021-03-21 16:14:15', '2021-03-21 16:14:15'),
(61, 'CITIZEN-BE9170-56E-1616343253557', 'BE9170-56E', '2021-03-21 16:14:16', '2021-03-21 16:14:16'),
(62, 'CITIZEN-BE9174-55A-1616343280554', 'BE9174-55A', '2021-03-21 16:14:42', '2021-03-21 16:14:42'),
(63, 'CITIZEN-BE9174-55A-1616343280555', 'BE9174-55A', '2021-03-21 16:14:42', '2021-03-21 16:14:42'),
(64, 'CITIZEN-BE9174-55A-1616343280557', 'BE9174-55A', '2021-03-21 16:14:42', '2021-03-21 16:14:42'),
(65, 'CITIZEN-BE9174-55A-1616343280556', 'BE9174-55A', '2021-03-21 16:14:42', '2021-03-21 16:14:42'),
(66, 'CITIZEN-BJ7010-24W-1616343316121', 'BJ7010-24W', '2021-03-21 16:15:17', '2021-03-21 16:15:17'),
(67, 'CITIZEN-BJ7010-24W-1616343316122', 'BJ7010-24W', '2021-03-21 16:15:18', '2021-03-21 16:15:18'),
(68, 'CITIZEN-BJ7010-24W-1616343316124', 'BJ7010-24W', '2021-03-21 16:15:20', '2021-03-21 16:15:20'),
(69, 'CITIZEN-BJ7010-24W-1616343316123', 'BJ7010-24W', '2021-03-21 16:15:21', '2021-03-21 16:15:21'),
(70, 'CITIZEN-BL9000-83E-1616343336472', 'BL9000-83E', '2021-03-21 16:15:38', '2021-03-21 16:15:38'),
(71, 'CITIZEN-BL9000-83E-1616343336473', 'BL9000-83E', '2021-03-21 16:15:38', '2021-03-21 16:15:38'),
(72, 'CITIZEN-BL9000-83E-1616343336474', 'BL9000-83E', '2021-03-21 16:15:38', '2021-03-21 16:15:38'),
(73, 'CITIZEN-BL9000-83E-1616343336475', 'BL9000-83E', '2021-03-21 16:15:39', '2021-03-21 16:15:39'),
(74, 'CITIZEN-BM6774-51A-1616343358864', 'BM6774-51A', '2021-03-21 16:16:00', '2021-03-21 16:16:00'),
(75, 'CITIZEN-BM6774-51A-1616343358867', 'BM6774-51A', '2021-03-21 16:16:00', '2021-03-21 16:16:00'),
(76, 'CITIZEN-BM6774-51A-1616343358866', 'BM6774-51A', '2021-03-21 16:16:00', '2021-03-21 16:16:00'),
(77, 'CITIZEN-BM6774-51A-1616343358865', 'BM6774-51A', '2021-03-21 16:16:00', '2021-03-21 16:16:00'),
(78, 'CITIZEN-EJ6130-51E-1616343380429', 'EJ6130-51E', '2021-03-21 16:16:21', '2021-03-21 16:16:21'),
(79, 'CITIZEN-EJ6130-51E-1616343380430', 'EJ6130-51E', '2021-03-21 16:16:22', '2021-03-21 16:16:22'),
(80, 'CITIZEN-EJ6130-51E-1616343380431', 'EJ6130-51E', '2021-03-21 16:16:22', '2021-03-21 16:16:22'),
(81, 'CITIZEN-EJ6130-51E-1616343380432', 'EJ6130-51E', '2021-03-21 16:16:22', '2021-03-21 16:16:22'),
(82, 'CITIZEN-EJ6134-50A-1616343404644', 'EJ6134-50A', '2021-03-21 16:16:45', '2021-03-21 16:16:45'),
(83, 'CITIZEN-EJ6134-50A-1616343404645', 'EJ6134-50A', '2021-03-21 16:16:46', '2021-03-21 16:16:46'),
(84, 'CITIZEN-EJ6134-50A-1616343404646', 'EJ6134-50A', '2021-03-21 16:16:46', '2021-03-21 16:16:46'),
(85, 'CITIZEN-EJ6134-50A-1616343404647', 'EJ6134-50A', '2021-03-21 16:16:46', '2021-03-21 16:16:46'),
(86, 'CITIZEN-EW1580-50E-1616343443694', 'EW1580-50E', '2021-03-21 16:17:24', '2021-03-21 16:17:24'),
(87, 'CITIZEN-EW1580-50E-1616343443695', 'EW1580-50E', '2021-03-21 16:17:25', '2021-03-21 16:17:25'),
(88, 'CITIZEN-EW1580-50E-1616343443697', 'EW1580-50E', '2021-03-21 16:17:25', '2021-03-21 16:17:25'),
(89, 'CITIZEN-EW1580-50E-1616343443696', 'EW1580-50E', '2021-03-21 16:17:25', '2021-03-21 16:17:25'),
(90, 'CITIZEN-EW1582-03A-1616343480740', 'EW1582-03A', '2021-03-21 16:18:02', '2021-03-21 16:18:02'),
(91, 'CITIZEN-EW1582-03A-1616343480739', 'EW1582-03A', '2021-03-21 16:18:02', '2021-03-21 16:18:02'),
(92, 'CITIZEN-EW1582-03A-1616343480738', 'EW1582-03A', '2021-03-21 16:18:03', '2021-03-21 16:18:03'),
(93, 'CITIZEN-EW1582-03A-1616343480737', 'EW1582-03A', '2021-03-21 16:18:03', '2021-03-21 16:18:03'),
(94, 'CITIZEN-NB2010-58A-1616343507503', 'NB2010-58A', '2021-03-21 16:18:28', '2021-03-21 16:18:28'),
(95, 'CITIZEN-NB2010-58A-1616343507504', 'NB2010-58A', '2021-03-21 16:18:29', '2021-03-21 16:18:29'),
(96, 'CITIZEN-NB2010-58A-1616343507506', 'NB2010-58A', '2021-03-21 16:18:29', '2021-03-21 16:18:29'),
(97, 'CITIZEN-NB2010-58A-1616343507505', 'NB2010-58A', '2021-03-21 16:18:29', '2021-03-21 16:18:29'),
(98, 'CITIZEN-NP1000-04E-1616343540505', 'NP1000-04E', '2021-03-21 16:19:01', '2021-03-21 16:19:01'),
(99, 'CITIZEN-NP1000-04E-1616343540503', 'NP1000-04E', '2021-03-21 16:19:01', '2021-03-21 16:19:01'),
(100, 'CITIZEN-NP1000-04E-1616343540504', 'NP1000-04E', '2021-03-21 16:19:02', '2021-03-21 16:19:02'),
(101, 'CITIZEN-NP1000-04E-1616343540506', 'NP1000-04E', '2021-03-21 16:19:02', '2021-03-21 16:19:02'),
(102, 'CITIZEN-NP1020-15A-1616343560585', 'NP1020-15A', '2021-03-21 16:19:22', '2021-03-21 16:19:22'),
(103, 'CITIZEN-NP1020-15A-1616343560588', 'NP1020-15A', '2021-03-21 16:19:22', '2021-03-21 16:19:22'),
(104, 'CITIZEN-NP1020-15A-1616343560586', 'NP1020-15A', '2021-03-21 16:19:22', '2021-03-21 16:19:22'),
(105, 'CITIZEN-NP1020-15A-1616343560587', 'NP1020-15A', '2021-03-21 16:19:22', '2021-03-21 16:19:22'),
(106, 'DANIEL-WELLINGTON-DW00100021-1616343643679', 'DW00100021', '2021-03-21 16:20:44', '2021-03-21 16:20:44'),
(107, 'DANIEL-WELLINGTON-DW00100021-1616343643680', 'DW00100021', '2021-03-21 16:20:45', '2021-03-21 16:20:45'),
(108, 'DANIEL-WELLINGTON-DW00100021-1616343643682', 'DW00100021', '2021-03-21 16:20:45', '2021-03-21 16:20:45'),
(109, 'DANIEL-WELLINGTON-DW00100021-1616343643681', 'DW00100021', '2021-03-21 16:20:45', '2021-03-21 16:20:45'),
(110, 'DANIEL-WELLINGTON-DW00100086-1616343677399', 'DW00100086', '2021-03-21 16:21:18', '2021-03-21 16:21:18'),
(111, 'DANIEL-WELLINGTON-DW00100086-1616343677402', 'DW00100086', '2021-03-21 16:21:18', '2021-03-21 16:21:18'),
(112, 'DANIEL-WELLINGTON-DW00100086-1616343677400', 'DW00100086', '2021-03-21 16:21:19', '2021-03-21 16:21:19'),
(113, 'DANIEL-WELLINGTON-DW00100086-1616343677401', 'DW00100086', '2021-03-21 16:21:19', '2021-03-21 16:21:19'),
(114, 'DANIEL-WELLINGTON-DW00100161-1616343696469', 'DW00100161', '2021-03-21 16:21:37', '2021-03-21 16:21:37'),
(115, 'DANIEL-WELLINGTON-DW00100161-1616343696468', 'DW00100161', '2021-03-21 16:21:37', '2021-03-21 16:21:37'),
(116, 'DANIEL-WELLINGTON-DW00100161-1616343696471', 'DW00100161', '2021-03-21 16:21:38', '2021-03-21 16:21:38'),
(117, 'DANIEL-WELLINGTON-DW00100161-1616343696470', 'DW00100161', '2021-03-21 16:21:38', '2021-03-21 16:21:38'),
(118, 'DANIEL-WELLINGTON-DW00100162-1616343713692', 'DW00100162', '2021-03-21 16:21:55', '2021-03-21 16:21:55'),
(119, 'DANIEL-WELLINGTON-DW00100162-1616343713693', 'DW00100162', '2021-03-21 16:21:55', '2021-03-21 16:21:55'),
(120, 'DANIEL-WELLINGTON-DW00100162-1616343713691', 'DW00100162', '2021-03-21 16:21:56', '2021-03-21 16:21:56'),
(121, 'DANIEL-WELLINGTON-DW00100162-1616343713694', 'DW00100162', '2021-03-21 16:21:59', '2021-03-21 16:21:59'),
(122, 'DANIEL-WELLINGTON-DW00100163-1616343732984', 'DW00100163', '2021-03-21 16:22:14', '2021-03-21 16:22:14'),
(123, 'DANIEL-WELLINGTON-DW00100163-1616343732986', 'DW00100163', '2021-03-21 16:22:14', '2021-03-21 16:22:14'),
(124, 'DANIEL-WELLINGTON-DW00100163-1616343732987', 'DW00100163', '2021-03-21 16:22:14', '2021-03-21 16:22:14'),
(125, 'DANIEL-WELLINGTON-DW00100163-1616343732985', 'DW00100163', '2021-03-21 16:22:14', '2021-03-21 16:22:14'),
(126, 'DANIEL-WELLINGTON-DW00100164-1616343750281', 'DW00100164', '2021-03-21 16:22:31', '2021-03-21 16:22:31'),
(127, 'DANIEL-WELLINGTON-DW00100164-1616343750284', 'DW00100164', '2021-03-21 16:22:31', '2021-03-21 16:22:31'),
(128, 'DANIEL-WELLINGTON-DW00100164-1616343750282', 'DW00100164', '2021-03-21 16:22:32', '2021-03-21 16:22:32'),
(129, 'DANIEL-WELLINGTON-DW00100164-1616343750283', 'DW00100164', '2021-03-21 16:22:32', '2021-03-21 16:22:32'),
(130, 'DANIEL-WELLINGTON-DW00100186-1616343771657', 'DW00100186', '2021-03-21 16:22:52', '2021-03-21 16:22:52'),
(131, 'DANIEL-WELLINGTON-DW00100186-1616343771659', 'DW00100186', '2021-03-21 16:22:52', '2021-03-21 16:22:52'),
(132, 'DANIEL-WELLINGTON-DW00100186-1616343771660', 'DW00100186', '2021-03-21 16:22:52', '2021-03-21 16:22:52'),
(133, 'DANIEL-WELLINGTON-DW00100186-1616343771658', 'DW00100186', '2021-03-21 16:22:53', '2021-03-21 16:22:53'),
(134, 'DANIEL-WELLINGTON-DW00100201-1616343867242', 'DW00100201', '2021-03-21 16:24:28', '2021-03-21 16:24:28'),
(135, 'DANIEL-WELLINGTON-DW00100201-1616343867244', 'DW00100201', '2021-03-21 16:24:29', '2021-03-21 16:24:29'),
(136, 'DANIEL-WELLINGTON-DW00100201-1616343867243', 'DW00100201', '2021-03-21 16:24:29', '2021-03-21 16:24:29'),
(137, 'DANIEL-WELLINGTON-DW00100201-1616343867241', 'DW00100201', '2021-03-21 16:24:30', '2021-03-21 16:24:30'),
(138, 'DANIEL-WELLINGTON-DW00100228-1616343893108', 'DW00100228', '2021-03-21 16:24:54', '2021-03-21 16:24:54'),
(139, 'DANIEL-WELLINGTON-DW00100228-1616343893111', 'DW00100228', '2021-03-21 16:24:54', '2021-03-21 16:24:54'),
(140, 'DANIEL-WELLINGTON-DW00100228-1616343893109', 'DW00100228', '2021-03-21 16:24:54', '2021-03-21 16:24:54'),
(141, 'DANIEL-WELLINGTON-DW00100228-1616343893110', 'DW00100228', '2021-03-21 16:24:54', '2021-03-21 16:24:54'),
(142, 'DANIEL-WELLINGTON-DW00100239-1616343917542', 'DW00100239', '2021-03-21 16:25:19', '2021-03-21 16:25:19'),
(143, 'DANIEL-WELLINGTON-DW00100239-1616343917543', 'DW00100239', '2021-03-21 16:25:19', '2021-03-21 16:25:19'),
(144, 'DANIEL-WELLINGTON-DW00100239-1616343917544', 'DW00100239', '2021-03-21 16:25:19', '2021-03-21 16:25:19'),
(145, 'DANIEL-WELLINGTON-DW00100239-1616343917541', 'DW00100239', '2021-03-21 16:25:19', '2021-03-21 16:25:19'),
(146, 'DANIEL-WELLINGTON-DW00100246-1616343948172', 'DW00100246', '2021-03-21 16:25:49', '2021-03-21 16:25:49'),
(147, 'DANIEL-WELLINGTON-DW00100246-1616343948171', 'DW00100246', '2021-03-21 16:25:50', '2021-03-21 16:25:50'),
(148, 'DANIEL-WELLINGTON-DW00100246-1616343948170', 'DW00100246', '2021-03-21 16:25:50', '2021-03-21 16:25:50'),
(149, 'DANIEL-WELLINGTON-DW00100246-1616343948169', 'DW00100246', '2021-03-21 16:25:50', '2021-03-21 16:25:50'),
(150, 'DANIEL-WELLINGTON-DW00100248-1616343969087', 'DW00100248', '2021-03-21 16:26:10', '2021-03-21 16:26:10'),
(151, 'DANIEL-WELLINGTON-DW00100248-1616343969088', 'DW00100248', '2021-03-21 16:26:11', '2021-03-21 16:26:11'),
(152, 'DANIEL-WELLINGTON-DW00100248-1616343969090', 'DW00100248', '2021-03-21 16:26:11', '2021-03-21 16:26:11'),
(153, 'DANIEL-WELLINGTON-DW00100248-1616343969089', 'DW00100248', '2021-03-21 16:26:11', '2021-03-21 16:26:11'),
(154, 'DANIEL-WELLINGTON-DW00100257-1616343986403', 'DW00100257', '2021-03-21 16:26:27', '2021-03-21 16:26:27'),
(155, 'DANIEL-WELLINGTON-DW00100257-1616343986404', 'DW00100257', '2021-03-21 16:26:28', '2021-03-21 16:26:28'),
(156, 'DANIEL-WELLINGTON-DW00100257-1616343986405', 'DW00100257', '2021-03-21 16:26:28', '2021-03-21 16:26:28'),
(157, 'DANIEL-WELLINGTON-DW00100257-1616343986406', 'DW00100257', '2021-03-21 16:26:28', '2021-03-21 16:26:28'),
(158, 'DANIEL-WELLINGTON-DW00100260-1616344007745', 'DW00100260', '2021-03-21 16:26:48', '2021-03-21 16:26:48'),
(159, 'DANIEL-WELLINGTON-DW00100260-1616344007748', 'DW00100260', '2021-03-21 16:26:49', '2021-03-21 16:26:49'),
(160, 'DANIEL-WELLINGTON-DW00100260-1616344007746', 'DW00100260', '2021-03-21 16:26:49', '2021-03-21 16:26:49'),
(161, 'DANIEL-WELLINGTON-DW00100260-1616344007747', 'DW00100260', '2021-03-21 16:26:49', '2021-03-21 16:26:49'),
(162, 'DANIEL-WELLINGTON-DW00500002-1616344027028', 'DW00500002', '2021-03-21 16:27:08', '2021-03-21 16:27:08'),
(163, 'DANIEL-WELLINGTON-DW00500002-1616344027030', 'DW00500002', '2021-03-21 16:27:09', '2021-03-21 16:27:09'),
(164, 'DANIEL-WELLINGTON-DW00500002-1616344027031', 'DW00500002', '2021-03-21 16:27:09', '2021-03-21 16:27:09'),
(165, 'DANIEL-WELLINGTON-DW00500002-1616344027029', 'DW00500002', '2021-03-21 16:27:09', '2021-03-21 16:27:09'),
(166, 'G-SHOCK-DW-6900-1616426536761', 'DW-6900', '2021-03-22 15:22:18', '2021-03-22 15:22:18'),
(167, 'G-SHOCK-DW-6900-1616426536760', 'DW-6900', '2021-03-22 15:22:19', '2021-03-22 15:22:19'),
(168, 'G-SHOCK-DW-6900-1616426536762', 'DW-6900', '2021-03-22 15:22:20', '2021-03-22 15:22:20'),
(169, 'G-SHOCK-DW-6900-1616426536759', 'DW-6900', '2021-03-22 15:22:21', '2021-03-22 15:22:21'),
(170, 'CASIO-MTP-1374L-7AVDF-1616426890506', 'MTP-1374L-7AVDF', '2021-03-22 15:28:12', '2021-03-22 15:28:12'),
(171, 'CASIO-MTP-1374L-7AVDF-1616426890503', 'MTP-1374L-7AVDF', '2021-03-22 15:28:12', '2021-03-22 15:28:12'),
(172, 'CASIO-MTP-1374L-7AVDF-1616426890505', 'MTP-1374L-7AVDF', '2021-03-22 15:28:14', '2021-03-22 15:28:14'),
(173, 'CASIO-MTP-1374L-7AVDF-1616426890502', 'MTP-1374L-7AVDF', '2021-03-22 15:28:14', '2021-03-22 15:28:14'),
(174, 'CASIO-MTP-1374L-7AVDF-1616426890504', 'MTP-1374L-7AVDF', '2021-03-22 15:28:15', '2021-03-22 15:28:15');

-- --------------------------------------------------------

--
-- Table structure for table `listcart`
--

CREATE TABLE `listcart` (
  `listCartId` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `payment` int(11) DEFAULT NULL,
  `shipping` varchar(50) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `listcart`
--

INSERT INTO `listcart` (`listCartId`, `status`, `payment`, `shipping`, `note`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 1, 0, 'FREE SHIP', 'duong 8, Thành phố Hồ Chí Minh, Quận Thủ Đức', '2021-03-24 18:02:11', '2021-03-24 19:03:50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text,
  `trademarkId` int(11) NOT NULL,
  `dayAdd` datetime DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `name`, `gender`, `code`, `price`, `description`, `trademarkId`, `dayAdd`, `amount`, `createdAt`, `updatedAt`) VALUES
('AW1370-51M', 'CITIZEN AW1370-51M', 'Nam', 'AW1370-51M', 4347000, 'Mẫu Citizen AW1370-51M phiên bản thời trang với mặt số tông nền xanh mang đến cho phái mạnh vẻ ngoài trẻ trung và nổi trội với trang bị công nghệ hiện đại Eco-Drive (Năng lượng ánh sáng).', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:40:36', '2020-11-22 15:39:48'),
('B650WC-5ADF', 'CASIO B650WC-5ADF', 'Nữ', 'B650WC-5ADF', 1763000, 'Mẫu Casio B650WC-5ADF mặt đồng hồ vuông với thiết kế theo phong cách hoài cổ mặt số điện tử kèm theo nhiều chức năng tiện ích cho người dùng, dây đeo kim loại phối tông màu vàng hồng tạo nên vẻ trẻ trung.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 17:35:01', '2020-11-22 15:39:48'),
('B650WD-1ADF', 'CASIO B650WD-1ADF', 'Nam', 'B650WD-1ADF', 987000, 'Mẫu Casio B650WD-1ADF thiết kế mặt số vuông được các bạn trẻ ưa chuộng, với nền mặt số điện tử hiện thị nhiều tính năng tiện ích phù hợp cho các hoạt động phượt dã ngoại hoặc thể thao.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 17:37:32', '2020-11-22 15:39:48'),
('BE9170-56E', 'Citizen BE9170-56E', 'Nam', 'BE9170-56E', 4950000, 'Mẫu Citizen BE9170-56E vẻ ngoài nam tính đầy giản dị với nền mặt số tông màu đen, các vạch số được gia công kiểu dáng mỏng 1 cách tinh tế, nổi bật phần kim giây với thiết kế kiểu không đồng trục tạo nên sự độc đáo.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:01:29', '2020-11-22 15:39:48'),
('BE9174-55A', 'CITIZEN BE9174-55A', 'Nam', 'BE9174-55A', 4500000, 'Mẫu Citizen BE9174-55A với thiết kế tôn lên vẻ tinh tế với các chi tiết kim chỉ cùng vạch số thanh mảnh sang trọng đầy quý phái với mẫu dây đeo demi thời trang.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 15:38:07', '2020-11-22 15:39:48'),
('BJ7010-24W', 'Citizen BJ7010-24W', 'Nam', 'BJ7010-24W', 8170000, 'Đồng hồ cao cấp Citizen  Eco Drive được đánh giá là “chìa khóa thành công” mang đến đế chế vững mạnh cho Citizen cho đến thời điểm này. Sản phẩm Eco Drive sử dụng công nghệ high-tech hoạt động nhờ vào năng lượng được chuyển hóa từ ánh sáng của bất cứ nguồn sáng nào.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:37:24', '2020-11-22 15:39:48'),
('BL9000-83E', 'Citizen BL9000-83E', 'Nam', 'BL9000-83E', 15360000, 'Citizen BL9000-83E là sản phẩm được thiết kế tinh tế, hiện đại với sự kết hợp hoàn hảo giữa kỹ thuật chế tạo đồng hồ nổi tiếng của Nhật Bản, cùng với đó là phong cách thời trang đẳng cấp luôn mang lại nét trẻ trung, lịch lãm cho phái mạnh.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:24:52', '2020-11-22 15:39:48'),
('BM6774-51A', 'Citizen BM6774-51A', 'Nam', 'BM6774-51A', 6180000, 'CITIZEN NAM – ECO-DRIVE (NĂNG LƯỢNG ÁNH SÁNG) – KÍNH SAPPHIRE lịch lãm với mặt đồng hồ tròn màu trắng viền vàng, chữ số La Mã mạ vàng, dây đeo demi thời trang, 3 kim chỉ, 1 lịch ngày.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 15:51:02', '2020-11-22 15:39:48'),
('DW-6900', 'Casio G-SHOCK DW-6900', 'Nam', 'DW-6900', 200000, 'Mẫu đồng hồ Casio DW-6900 mạnh mẽ và đầy nam tính với gam màu đen xám nổi bật của một phong cách bụi bặm dành cho nam dưới. Chiếc đồng hồ này là một sự lựa chọn thông minh dành cho những quý ông hay đi phượt, ưa thích phưu lưu mạo hiểm.', 6, '2021-03-11 17:00:00', 10, '2021-03-12 14:37:22', '2021-03-12 14:37:22'),
('DW00100021', 'Daniel Wellington DW00100021\n', 'Nam', 'DW00100021', 5000000, 'Đồng hồ Daniel Wellington DW00100021 có thiết kế cổ điển khi mặt số tròn kết hợp với dây đeo da màu nâu bóng, kim chỉ và vạch số được dát mỏng tinh tế nổi bật trên nền số màu trắng trang nhã, tạo nên phụ kiện thời trang mang đến nét nam tính lịch lãm.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:17:03', '2020-11-22 15:39:48'),
('DW00100086', 'Daniel Wellington DW00100086', 'Nam', 'DW00100086', 4800000, 'Đồng hồ Daniel Wellington DW00100086 có mặt số tròn tinh tế, kim chỉ màu xanh dương độc đáo cùng vạch số La Mã phủ màu đen nổi bật trên nền số màu trắng trang nhã, dây da nâu trơn mang lại phong cách thời trang.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:08:31', '2020-11-22 15:39:48'),
('DW00100161', 'Daniel Wellington DW00100161', 'Nữ', 'DW00100161', 4000000, 'Mẫu đồng hồ nữ Daniel Wellington DW00100161 khi kết hợp giữa vỏ máy cùng dây đeo kim loại dạng lưới cùng chung tông màu vàng hồng tạo nên phụ kiện thời trang trẻ trung dành riêng cho phái đẹp.', 3, '2020-11-17 17:00:00', 10, '2020-11-18 17:05:33', '2020-11-22 15:39:48'),
('DW00100162', 'Daniel Wellington DW00100162', 'Nam', 'DW00100162', 4100000, 'Mẫu đồng hồ nữ với thiết kế giản dị đến từ hãng Daniel Wellington DW00100162 kim chỉ cùng vạch số được gia công kiểu dáng thanh mảnh mang lại vẻ nữ tính trên nền mặt số tông màu đen huyền bí.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 04:55:58', '2020-11-22 15:39:48'),
('DW00100163', 'Daniel Wellington DW00100163', 'Nữ', 'DW00100163', 4100000, 'Mẫu đồng hồ nữ Daniel Wellington DW00100163 kim chỉ cùng vạch số được gia công kiểu dáng thanh mảnh trên nền mặt số tông màu trắng trang trọng, phối cùng bô dây đeo kim loại dạng lưới vàng hồng thời trang.', 3, '2020-11-17 17:00:00', 10, '2020-11-18 17:08:46', '2020-11-22 15:39:48'),
('DW00100164', 'Daniel Wellington DW00100164', 'Nữ', 'DW00100164', 4100000, 'Mẫu đồng hồ thiết kế phong cách giản dị đến từ hãng Daniel Wellington DW00100164 dành cho nữ, kim chỉ cùng vạch số được gia công kiểu dáng thanh mảnh, sự kết hợp hài hòa giữa nền mặt số trắng cùng dây đeo kim loại lưới màu bạc.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 04:58:07', '2020-11-22 15:39:48'),
('DW00100186', 'Daniel Wellington DW00100186', 'Nữ', 'DW00100186', 3800000, 'Mẫu đồng hồ nữ DW00100186 kiểu dáng đặc trưng giản dị đến từ thương hiệu Daniel Wellington, mặt số tròn nhỏ kết hợp cùng mẫu dây da trơn mang lại vẻ thanh lịch cho các phái đẹp.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:12:56', '2020-11-22 15:39:48'),
('DW00100201', 'Daniel Wellington DW00100201', 'Nữ', 'DW00100201', 4100000, 'Mẫu đồng hồ nữ Daniel Wellington DW00100201 mang lại vẻ thời trang đến từ mẫu dây đeo kim loại dạng dây lưới với tông màu đen cá tính trẻ trung khi kết hợp cùng chi tiết vạch số kim chỉ màu vàng hồng.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 05:03:07', '2020-11-22 15:39:48'),
('DW00100228', 'Daniel Wellington DW00100228', 'Nữ', 'DW00100228', 3500000, 'Mẫu đồng hồ nữ DW00100228 mặt số 28mm tròn nhỏ nữ tính, kiểu dáng giản dị 2 kim với chi tiết kim chỉ vạch số vàng hồng mang lại vẻ trẻ trung thanh lịch đến từ thương hiệu Daniel Wellington.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:28:36', '2021-03-04 07:01:39'),
('DW00100239', 'Daniel Wellington DW00100239', 'Nữ', 'DW00100239', 3400000, 'Mẫu đồng hồ DW00100239 mặt số tròn nhỏ thanh mảnh đầy nữ tính đến từ thương hiệu Daniel Wellington các chi tiết vỏ máy cùng vạch số được phủ tông màu vàng nâu khoác lên sự trẻ trung thanh lịch.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 15:55:28', '2020-11-22 15:39:48'),
('DW00100246', 'Daniel Wellington DW00100246', 'Nữ', 'DW00100246', 3600000, 'Mẫu đồng hồ nữ Daniel Wellington DW00100246 các chi tiết vạch số được tạo hình mỏng tinh tế khi cùng với tổng thể tông màu đen quyến rủ kết hợp cùng mẫu dây đeo kim loại dạng lưới phong cách thời trang.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 05:04:22', '2020-11-22 15:39:48'),
('DW00100248', 'Daniel Wellington DW00100248', 'Nữ', 'DW00100248', 3000000, 'Mẫu đồng hồ nữ DW00100248 với nét đặc trưng giản dị đến từ thương hiệu Daniel Wellington với tổng thể vỏ máy kim chỉ được bao phủ tông màu đen kết hợp cùng mẫu dây đeo chất liệu vải mang phong cách trẻ trung.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:20:10', '2020-11-22 15:39:48'),
('DW00100257', 'Daniel Wellington DW00100257', 'Nam', 'DW00100257', 4500000, 'Mẫu đồng hồ DW00100257 phong cách giản dị mang đặc trưng khó tả đến từ hãng Daniel Wellington các chi tiết vạch số cho đến phần vỏ máy đều được tạo hình mỏng kết hợp cùng mẫu dây vải khoác lên vẻ trẻ trung.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:26:28', '2020-11-22 15:39:48'),
('DW00100260', 'Daniel Wellington DW00100260', 'Nữ', 'DW00100260', 3600000, 'Mẫu đồng hồ nữ DW00100260 với phong cách giản dị đặc trưng đến từ thương hiệu Daniel Wellington thanh lịch với các chi tiết vạch số cho đến thiết kế bộ máy được tạo dáng mỏng kết hợp cùng mẫu dây vải thời trang.', 3, '2020-11-18 17:00:00', 10, '2020-11-19 16:22:49', '2020-11-22 15:39:48'),
('DW00500002', 'Daniel Wellington DW00500002', 'Nam', 'DW00500002', 5000000, 'Vẻ điển trai đầy lịch lãm với mẫu Daniel Wellington DW00500002 được phối tông màu dây da nâu, sự giản dị của chiếc đồng hồ 2 kim ẩn chứa bên trọng sự tinh tế với các chi tiết vạch số cùng kim chỉ tạo hình mỏng.\n\n', 3, '2020-11-18 17:00:00', 10, '2020-11-19 05:07:46', '2020-11-22 15:39:48'),
('EFV-540D-7AVUDF', 'CASIO EFV-540D-7AVUDF', 'Nam', 'EFV-540D-7AVUDF', 2561000, 'Mẫu đồng hồ EFV-540D-7AVUDF thuộc dòng Edifice đến từ thương hiệu Casio với kiểu dáng 6 kim kèm theo tính năng Chronograph mang lại vẻ ngoài nam tính cùng khả năng chịu nước đầy ấn tượng 10 ATM.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:07:12', '2020-11-22 15:39:48'),
('EFV-570D-7AVUDF', 'CASIO EFV-570D-7AVUDF', 'Nam', 'EFV-570D-7AVUDF', 3361000, 'Mẫu Casio EFV-570D-7AVUDF nổi bật với kiểu dáng 6 kim kèm tính năng Chronograph đo thời gian vượt trội đặc trưng thuộc dòng Edifice dành cho các tín đồ yêu thích phong cách thể thao nhưng lại khoác trên mình vẻ ngoài lịch lãm.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:04:38', '2020-11-22 15:39:48'),
('EJ6130-51E', 'Citizen EJ6130-51E', 'Nữ', 'EJ6130-51E', 3700000, 'Mẫu Citizen EJ6130-51E với thiết kế Được thiết kế với đường kính mặt số 30mm, bề dày mặt số 7mm phù hợp với những bạn gái có cổ tay thon gọn và nhỏ.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:11:50', '2020-11-22 15:39:48'),
('EJ6134-50A', 'Citizen EJ6134-50A', 'Nữ', 'EJ6134-50A', 4100000, 'Mẫu Citizen EJ6134-50A dành riêng cho phái đẹp với phần vỏ viền ngoài được gia công tỉ mỉ đính kèm các viên pha lê xung quanh viền kết hợp cùng chi tiết kim chỉ mạ vàng tạo nên phụ kiện thời trang.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:07:11', '2020-11-22 15:39:48'),
('EW1580-50E', 'Citizen EW1580-50E', 'Nữ', 'EW1580-50E', 5720000, 'Đồng hồ thời trang nữ Citizen EW1580-50E với nền số màu đen sang trọng, kim chỉ và vạch số được mạ bạc tinh tế nổi bật, lịch ngày vị trí 3h tiện dụng, dây đeo kim loại mang đến cho phái nữ vẻ trang nhã, quyến rũ.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 15:42:14', '2020-11-22 15:39:48'),
('EW1582-03A', 'Citizen EW1582-03A', 'Nữ', 'EW1582-03A', 5410000, 'Đồng hồ mạ vàng dây da nữ Citizen EW1582-03A, mặt đồng hồ màu trắng viền vàng 3 kim, chữ số La Mã mạ vàng, dây da màu đen có vân, vỏ thép không gỉ mạ vàng.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 15:44:59', '2020-11-22 15:39:48'),
('LTP-1308D-4AVDF', 'CASIO LTP-1308D-4AVDF', 'Nữ', 'LTP-1308D-4AVDF', 1222000, 'Đồng hồ thời trang Casio LTP-1308D-4AVDF dành cho nữ giới, mặt đồng hồ nền hồng duyên dáng, mặt số 3 kim đơn giản.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:11:24', '2020-11-22 15:39:48'),
('LTP-E402G-9AVDF', 'CASIO LTP-E402G-9AVDF', 'Nữ', 'LTP-E402G-9AVDF', 3455000, 'Đồng hồ nữ Casio LTP-E402G-9AVDF với niềng được bo tròn nữ tính, nền số màu vàng có kim chỉ và gạch số được mạ vàng sang trọng, dây đeo kim loại được làm cong quyến rũ.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:14:30', '2020-11-22 15:39:48'),
('MTP-1374D-1AVDF', 'CASIO MTP-1374D-1AVDF', 'Nam', 'MTP-1374D-1AVDF', 2468000, 'Đồng hồ Casio MTP-1374D-1AVDF có mặt số tròn lớn với nền số màu đen manh mẽ, kim chỉ và vạch số phủ phản quang nổi bật, dây đeo kim loại chắc chắn mạ bạc sáng bóng, đem lại phong cách thời trang lịch lãm nam tính cho phái mạnh.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:01:15', '2020-11-22 15:39:48'),
('MTP-1374D-2A', 'Casio MTP-1374D-2A', 'Nam', 'MTP-1374D-2A', 1974000, 'Đồng hồ thể thao dây da Casio MTP-1374D-2A dành cho nam giới, vỏ bàng thép không gỉ, dây da màu đen, mặt kính Sapphire chống trầy, mặt số đồng hồ màu đen có viền trắng và có 3 kim.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:24:58', '2020-11-22 15:39:48'),
('MTP-1374D-7AVDF', 'CASIO MTP-1374D-7AVDF', 'Nam', 'MTP-1374D-7AVDF', 1974000, 'Đồng hồ Casio MTP-1374D-7AVDF với niềng kim loại được phủ màu đen nổi bật bao quanh nền số màu bạc sang trọng, kim chỉ và vạch số được phủ phản quang nổi bật.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:27:34', '2020-11-22 15:39:48'),
('MTP-1374L-1AVDF', 'CASIO MTP-1374L-1AVDF', 'Nam', 'MTP-1374L-1AVDF', 1863000, 'Đồng hồ Casio MTP-1374L-1AVDF đi kèm dây da Genuine chất lượng màu đen tuyền. Mặt dây dập vân cá sấu sang trọng, chỉ khâu viên có màu trắng tạo cảm giác thể thao rõ nét cũng như nhấn mạnh thêm chủ đề đen-trắng mà tổng thể hướng đến.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 17:48:41', '2020-11-22 15:39:48'),
('MTP-1374L-7AVDF', 'Casio MTP-1374L-7AVDF', 'Nam', 'MTP-1374L-7AVDF', 1904000, 'Đồng hồ thời trang nam sang trọng Casio MTP-1374L-7AVDF mặt đồng hồ có nền trắng viền vàng, dây da có vân.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 17:24:21', '2020-11-22 15:39:48'),
('MTP-E149L-1BVDF', 'CASIO MTP-E149L-1BVDF', 'Nam', 'MTP-E149L-1BVDF', 1880000, 'Mẫu Casio MTP-E149L-1BVDF mang trên mình vẻ ngoài lịch lãm với phiên bản dây da vân đen đầy nam tính, nền cọc số la mã được tạo nét mỏng cách tân khoác lên vẻ trẻ trung cho phái mạnh.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:18:20', '2020-11-22 15:39:48'),
('MTP-E149L-2BVDF', 'Casio MTP-E149L-2BVDF', 'Nam', 'MTP-E149L-2BVDF', 1880000, 'Đồng hồ thể thao dây da Casio MTP-E149L-2BVDF dành cho nam giới, vỏ bàng thép không gỉ, dây da màu đen, mặt kính Sapphire chống trầy, mặt số đồng hồ màu đen có viền trắng và có 3 kim.', 1, '2020-11-16 17:00:00', 10, '2020-11-16 18:21:58', '2020-11-22 15:39:48'),
('NB2010-58A', 'Citizen NB2010-58A', 'Nam', 'NB2010-58A', 18100000, 'Chiếc đồng hồ Citizen NB2010-58A dành riêng cho nam giới thuộc bộ sưu tập Citizen Mech và đây được đánh giá là một trong những bộ sưu tập huyền thoại trong làng đồng hồ thế giới bởi vẻ ngoài đầy “chất lừ” của nó và chất lượng đỉnh cao trong khâu sản xuất của thương hiệu lừng danh này.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:32:19', '2020-11-22 15:39:48'),
('NP1000-04E', 'Citizen NP1000-04E', 'Nam', 'NP1000-04E', 11500000, 'Đồng hồ thể thao dây da Citizen NP1000-04E dành cho nam giới, vỏ bàng thép không gỉ, dây da màu đen, mặt kính Sapphire chống trầy, mặt số đồng hồ màu đen có viền trắng và có 3 kim.', 2, '2020-11-16 17:00:00', 10, '2020-11-16 18:54:46', '2020-11-22 15:39:48'),
('NP1020-15A', 'Citizen NP1020-15A', 'Nam', 'NP1020-15A', 8450000, 'Vẻ ngoài quý ông lịch lãm với mẫu Citizen NP1020-15A với thiết kế độc đáo cùng ô chân kính trong suốt phô diễn ra 1 phần bên trong của bộ máy cơ chứa đựng cả một trải nghiệm đầy nam tính.', 2, '2020-11-17 17:00:00', 10, '2020-11-18 16:28:56', '2020-11-22 15:39:48');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Role_Admin', '2020-10-30 06:44:49', '2020-10-30 06:44:49'),
(2, 'Role_User', '2020-10-30 06:44:49', '2020-10-30 06:44:49');

-- --------------------------------------------------------

--
-- Table structure for table `trademark`
--

CREATE TABLE `trademark` (
  `trademarkId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `image` varchar(60) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trademark`
--

INSERT INTO `trademark` (`trademarkId`, `name`, `description`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'CASIO', 'Casio thương hiệu Nhật Bản, là thương hiệu đồng hồ được ưa chuộng nhất tại Việt Nam.', 'TRADEMARK-1-CASIO.jpg', '2020-10-30 06:49:27', '2020-11-06 04:39:03'),
(2, 'CITIZEN', 'Citizen thương hiệu Nhật Bản', 'TRADEMARK-2-CITIZEN.jpg', '2020-10-30 06:49:35', '2020-11-06 04:39:28'),
(3, 'DANIEL WELLINGTON', 'Daniel Wellington thương hiệu Thụy Điển, được lựa chọn mua nhìu nhất trong những năm gần đây.', 'TRADEMARK-3-DANIELWELLINGTON.jpg', '2020-10-31 03:46:51', '2020-11-06 04:39:39'),
(4, 'ORIENT', 'Orient là một thương hiệu đồng hồ nổi tiếng của nhật.', 'TRADEMARK-4-ORIENT.jpg', '2020-10-31 03:49:33', '2020-11-06 04:39:49'),
(5, 'SEIKO', 'Seiko Ra đời năm 1963 là một thương hiệu đồng hồ nổi tiếng của nhật, các mẫu đồng hồ tự động (automatic) của Seiko đã ghi dấu ấn mạnh mẽ với những tính năng tiện dụng.', 'TRADEMARK-5-SEIKO.jpg', '2020-10-31 16:00:01', '2020-11-06 04:39:59'),
(6, 'G-SHOCK', 'G-SHOCK thương hiệu Nhật Bản, độ bền cao.', 'TRADEMARK-6-G-SHOCK', '2021-03-09 17:07:24', '2021-03-09 17:07:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `fistName` varchar(200) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `birthday` datetime NOT NULL,
  `phone` int(11) NOT NULL,
  `gender` varchar(10) DEFAULT 'nam',
  `province` varchar(200) DEFAULT NULL,
  `district` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT '2',
  `avatar` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `fistName`, `lastName`, `birthday`, `phone`, `gender`, `province`, `district`, `address`, `email`, `password`, `roleId`, `avatar`, `createdAt`, `updatedAt`) VALUES
(1, 'hoàng', 'kỳ', '1999-02-16 00:00:00', 223355667, 'Nam', 'Thành phố Hồ Chí Minh', 'Quận Thủ Đức', 'duong 8', 'test@gmail.com', '$2b$12$i.hGVJFaJsofOzVnnSdU6O9ipSuJOuEdN8Hc8CF6hqWVm1NJZex8e', 2, '1-223355667', '2021-03-15 12:34:12', '2021-03-19 07:46:41'),
(2, 'Trong', 'Nghia', '1998-12-31 17:00:00', 1238888888, 'Nam', 'Thành phố Hồ Chí Minh\'', '', '', 'user@gmail.com', '$2b$12$.HDFR7eYYUVQz.n0sFy27OeXSs3zT4zwhabCuuMc/8j7hbaTwbYt6', 1, '2-1238888888', '2021-03-15 15:26:42', '2021-03-24 08:31:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blogId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `bonus`
--
ALTER TABLE `bonus`
  ADD PRIMARY KEY (`bonusId`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `detailbonus`
--
ALTER TABLE `detailbonus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bonusId` (`bonusId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `detailcart`
--
ALTER TABLE `detailcart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`),
  ADD KEY `listCartId` (`listCartId`);

--
-- Indexes for table `detailproduct`
--
ALTER TABLE `detailproduct`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productId` (`productId`);

--
-- Indexes for table `imageproduct`
--
ALTER TABLE `imageproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `listcart`
--
ALTER TABLE `listcart`
  ADD PRIMARY KEY (`listCartId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `trademarkId` (`trademarkId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trademark`
--
ALTER TABLE `trademark`
  ADD PRIMARY KEY (`trademarkId`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bonus`
--
ALTER TABLE `bonus`
  MODIFY `bonusId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detailbonus`
--
ALTER TABLE `detailbonus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `detailcart`
--
ALTER TABLE `detailcart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `detailproduct`
--
ALTER TABLE `detailproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `imageproduct`
--
ALTER TABLE `imageproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;
--
-- AUTO_INCREMENT for table `listcart`
--
ALTER TABLE `listcart`
  MODIFY `listCartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detailbonus`
--
ALTER TABLE `detailbonus`
  ADD CONSTRAINT `detailbonus_ibfk_1` FOREIGN KEY (`bonusId`) REFERENCES `bonus` (`bonusId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `detailbonus_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detailcart`
--
ALTER TABLE `detailcart`
  ADD CONSTRAINT `detailcart_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailcart_ibfk_2` FOREIGN KEY (`listCartId`) REFERENCES `listcart` (`listCartId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detailproduct`
--
ALTER TABLE `detailproduct`
  ADD CONSTRAINT `detailproduct_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `imageproduct`
--
ALTER TABLE `imageproduct`
  ADD CONSTRAINT `imageproduct_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `listcart`
--
ALTER TABLE `listcart`
  ADD CONSTRAINT `listcart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`trademarkId`) REFERENCES `trademark` (`trademarkId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
