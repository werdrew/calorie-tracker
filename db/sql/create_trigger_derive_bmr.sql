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