-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sidenotes_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sidenotes_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sidenotes_schema` DEFAULT CHARACTER SET utf8 ;
USE `sidenotes_schema` ;

-- -----------------------------------------------------
-- Table `sidenotes_schema`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sidenotes_schema`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sidenotes_schema`.`notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sidenotes_schema`.`notes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vote_count` VARCHAR(45) NULL,
  `content` VARCHAR(45) NULL,
  `book_ref` VARCHAR(45) NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_notes_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_notes_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `sidenotes_schema`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sidenotes_schema`.`votes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sidenotes_schema`.`votes` (
  `id` VARCHAR(45) NOT NULL,
  `value` TINYINT NOT NULL,
  `users_id` INT NOT NULL,
  `notes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_notes_notes1_idx` (`notes_id` ASC) VISIBLE,
  INDEX `fk_users_has_notes_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_notes_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `sidenotes_schema`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_notes_notes1`
    FOREIGN KEY (`notes_id`)
    REFERENCES `sidenotes_schema`.`notes` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sidenotes_schema`.`votes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sidenotes_schema`.`votes` (
  `id` VARCHAR(45) NOT NULL,
  `value` TINYINT NOT NULL,
  `users_id` INT NOT NULL,
  `notes_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_has_notes_notes1_idx` (`notes_id` ASC) VISIBLE,
  INDEX `fk_users_has_notes_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_notes_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `sidenotes_schema`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_notes_notes1`
    FOREIGN KEY (`notes_id`)
    REFERENCES `sidenotes_schema`.`notes` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
