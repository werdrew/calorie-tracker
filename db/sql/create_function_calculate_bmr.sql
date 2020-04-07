DELIMITER //
CREATE FUNCTION calculate_bmr
(
    age INT,
    height INT,
    weight INT,
    sex CHAR
)
RETURNS INT DETERMINISTIC
BEGIN
	DECLARE bmr INT;
    
    SET bmr = (9.99 * weight) + (6.25 * height) - (4.92 * age);
    
    SET bmr = bmr + 
    CASE
    	WHEN sex = 'M' THEN 5
        WHEN sex = 'F' THEN -161
	END;
    
    RETURN bmr;
END//
DELIMITER ;