/*
Navicat PGSQL Data Transfer

Source Server         : 192.168.99.100_5432
Source Server Version : 90500
Source Host           : 192.168.99.100:5432
Source Database       : test
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90500
File Encoding         : 65001

Date: 2016-04-25 15:57:51
*/

-- ----------------------------
-- Sequence structure for categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."categories_id_seq";
CREATE SEQUENCE "public"."categories_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 10
 CACHE 1;

-- ----------------------------
-- Sequence structure for levels_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."levels_id_seq";
CREATE SEQUENCE "public"."levels_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 6
 CACHE 1;

-- ----------------------------
-- Sequence structure for texts_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."texts_id_seq";
CREATE SEQUENCE "public"."texts_id_seq"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 1
 CACHE 1;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
"id" int8 DEFAULT nextval('categories_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"priority" int8,
"state" varchar(255) COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES ('1', '合同法律事务', '10', 'enable');
INSERT INTO "public"."categories" VALUES ('2', '侵权法律事务', '20', 'enable');
INSERT INTO "public"."categories" VALUES ('3', '物权法律事务', '30', 'enable');
INSERT INTO "public"."categories" VALUES ('4', '企业法律事务', '40', 'enable');
INSERT INTO "public"."categories" VALUES ('5', '金融法律事务', '50', 'enable');
INSERT INTO "public"."categories" VALUES ('6', '知识产权法律事务', '60', 'enable');
INSERT INTO "public"."categories" VALUES ('7', '劳动人事法律事务', '70', 'enable');
INSERT INTO "public"."categories" VALUES ('8', '企业经营管理犯罪与风险防范事务', '80', 'enable');
INSERT INTO "public"."categories" VALUES ('9', '税务', '90', 'enable');

-- ----------------------------
-- Table structure for levels
-- ----------------------------
DROP TABLE IF EXISTS "public"."levels";
CREATE TABLE "public"."levels" (
"id" int8 DEFAULT nextval('levels_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default" NOT NULL,
"grade" varchar(255) COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of levels
-- ----------------------------
INSERT INTO "public"."levels" VALUES ('1', '法律', 'A');
INSERT INTO "public"."levels" VALUES ('2', '司法解释', 'B');
INSERT INTO "public"."levels" VALUES ('3', '行政法规', 'C');
INSERT INTO "public"."levels" VALUES ('4', '部门规章', 'D');
INSERT INTO "public"."levels" VALUES ('5', '地方性法规', 'E');

-- ----------------------------
-- Table structure for texts
-- ----------------------------
DROP TABLE IF EXISTS "public"."texts";
CREATE TABLE "public"."texts" (
"id" int8 DEFAULT nextval('texts_id_seq'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"category_id" int8,
"authority" varchar(255) COLLATE "default",
"issue_date" date,
"execute_date" date,
"state" varchar(255) COLLATE "default",
"content" text COLLATE "default",
"level_id" int8
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of texts
-- ----------------------------

-- ----------------------------
-- Alter Sequences Owned By
-- ----------------------------
ALTER SEQUENCE "public"."categories_id_seq" OWNED BY "categories"."id";
ALTER SEQUENCE "public"."levels_id_seq" OWNED BY "levels"."id";
ALTER SEQUENCE "public"."texts_id_seq" OWNED BY "texts"."id";

-- ----------------------------
-- Uniques structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table levels
-- ----------------------------
ALTER TABLE "public"."levels" ADD UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table levels
-- ----------------------------
ALTER TABLE "public"."levels" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table texts
-- ----------------------------
ALTER TABLE "public"."texts" ADD UNIQUE ("name");

-- ----------------------------
-- Primary Key structure for table texts
-- ----------------------------
ALTER TABLE "public"."texts" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Key structure for table "public"."texts"
-- ----------------------------
ALTER TABLE "public"."texts" ADD FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."texts" ADD FOREIGN KEY ("level_id") REFERENCES "public"."levels" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
