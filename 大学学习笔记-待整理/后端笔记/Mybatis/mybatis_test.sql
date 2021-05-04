/*
SQLyog Ultimate v11.25 (64 bit)
MySQL - 5.5.28 : Database - mybatis_test
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mybatis_test` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mybatis_test`;

/*Table structure for table `tbl_dept` */

DROP TABLE IF EXISTS `tbl_dept`;

CREATE TABLE `tbl_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptName` varchar(30) DEFAULT NULL,
  `locAdd` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_dept` */

insert  into `tbl_dept`(`id`,`deptName`,`locAdd`) values (1,'开发部','东莞'),(2,'测试部','东莞'),(3,'产品部','北极');

/*Table structure for table `tbl_dog` */

DROP TABLE IF EXISTS `tbl_dog`;

CREATE TABLE `tbl_dog` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dog_Name` varchar(20) DEFAULT NULL,
  `dog_Weight` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_dog` */

insert  into `tbl_dog`(`id`,`dog_Name`,`dog_Weight`) values (1,'ww1',10),(2,'ww2',15);

/*Table structure for table `tbl_emp` */

DROP TABLE IF EXISTS `tbl_emp`;

CREATE TABLE `tbl_emp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `deptId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dept_id` (`deptId`),
  CONSTRAINT `fk_dept_id` FOREIGN KEY (`deptId`) REFERENCES `tbl_dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_emp` */

insert  into `tbl_emp`(`id`,`name`,`deptId`) values (1,'张三',1),(2,'李四',2),(3,'韩雁冰',2),(4,'刘总',1),(5,'雷神',3);

/*Table structure for table `tbl_key` */

DROP TABLE IF EXISTS `tbl_key`;

CREATE TABLE `tbl_key` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `keyName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_key` */

insert  into `tbl_key`(`id`,`keyName`) values (1,'1号钥匙'),(2,'2号钥匙');

/*Table structure for table `tbl_lock` */

DROP TABLE IF EXISTS `tbl_lock`;

CREATE TABLE `tbl_lock` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lockName` varchar(20) DEFAULT NULL,
  `key_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tblKey_id` (`key_id`),
  CONSTRAINT `fk_tblKey_id` FOREIGN KEY (`key_id`) REFERENCES `tbl_key` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_lock` */

insert  into `tbl_lock`(`id`,`lockName`,`key_id`) values (1,'1号锁',1),(2,'2号锁',2);

/*Table structure for table `tbl_person` */

DROP TABLE IF EXISTS `tbl_person`;

CREATE TABLE `tbl_person` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `age` int(4) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `registerTime` datetime DEFAULT NULL,
  `salary` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_person` */

insert  into `tbl_person`(`id`,`name`,`age`,`birth`,`registerTime`,`salary`) values (7,'bbbb',12,'2016-12-19','2016-12-19 15:20:27',3300.66),(8,'aaa',12,'2016-12-19','2016-12-19 15:21:57',3300.66),(9,'aaa',12,'2016-12-19','2016-12-19 16:56:51',3300.66);

/*Table structure for table `tbl_student` */

DROP TABLE IF EXISTS `tbl_student`;

CREATE TABLE `tbl_student` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_student` */

insert  into `tbl_student`(`id`,`name`,`score`,`birth`,`age`) values (1,'zhangsan',89.5,'2016-12-20',19),(2,'zhangsan',93.5,'2016-12-20',23),(3,'zhangsan',77.5,'2016-12-20',24);

/*Table structure for table `tbl_user` */

DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_user` */

insert  into `tbl_user`(`id`,`NAME`,`age`) values (1,'苏武',22),(2,'李青',31);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
