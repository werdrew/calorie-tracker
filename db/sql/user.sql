CREATE TABLE IF NOT EXISTS cs3200_project.user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    sex CHAR(1) NOT NULL,
    dob DATE NOT NULL,
    age INT NOT NULL DEFAULT 0,
    height INT NOT NULL,
    weight INT NOT NULL,
    bmr INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

-- Triggers
DELIMITER //
CREATE TRIGGER derive_age_before_insert
BEFORE INSERT
ON user FOR EACH ROW
BEGIN
	DECLARE diff INTEGER;
    
    SELECT TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE())
    INTO diff;
    
	SET NEW.age = diff;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER derive_age_before_update
BEFORE UPDATE
ON user FOR EACH ROW
BEGIN
	DECLARE diff INTEGER;
    
    SELECT TIMESTAMPDIFF(YEAR, NEW.dob, CURDATE())
    INTO diff;
    
	SET NEW.age = diff;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER derive_bmr_before_insert
BEFORE INSERT
ON user FOR EACH ROW
FOLLOWS derive_age_before_insert
BEGIN
	DECLARE bmr INTEGER;
    
    SET bmr = calculate_bmr(NEW.age, NEW.height, NEW.weight, NEW.sex);
    
    SET NEW.bmr = bmr;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER derive_bmr_before_update
BEFORE UPDATE
ON user FOR EACH ROW
FOLLOWS derive_age_before_update
BEGIN
	DECLARE bmr INTEGER;
    
    SET bmr = calculate_bmr(NEW.age, NEW.height, NEW.weight, NEW.sex);
    
    SET NEW.bmr = bmr;
END//
DELIMITER ;