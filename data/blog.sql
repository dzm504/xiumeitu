SET NAMES UTF8;
DROP DATABASE IF EXISTS myblog;
CREATE DATABASE myblog CHARSET=UTF8;
USE myblog;
CREATE TABLE users(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(16),
	pwd VARCHAR(16),
	email VARCHAR(32)
);
CREATE TABLE messages(
  mid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  msg VARCHAR(1024),
  createTime BIGINT    
);	
INSERT INTO messages VALUES(
  NULL, 'dzm','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'sd','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'dgf','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'gsv','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'rtd','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'cfd34','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'xcvcx','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
INSERT INTO messages VALUES(
  NULL, 'khjkh','网站内容不错，希望多增加点网站素材供下载，还有就是更新要快一点，望采纳！！！','1473951698228'
);
