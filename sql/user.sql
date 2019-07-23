/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : node_demo

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-07-23 14:51:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2125', '12');
INSERT INTO `user` VALUES ('2', 'hah', '4444');
INSERT INTO `user` VALUES ('3', 'qwer', '54');
INSERT INTO `user` VALUES ('4', 'jdh', '1111');
INSERT INTO `user` VALUES ('5', 'baidu', '45');
INSERT INTO `user` VALUES ('6', 'lbs', '2323');
INSERT INTO `user` VALUES ('7', 'bvbvb', '223');
