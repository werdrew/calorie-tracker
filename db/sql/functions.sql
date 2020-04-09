-- Calculate BMR using Mifflin St. Jeor formula,
-- given a user's age, height, weight, and sex.
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

-- Calculate calories gained given a food id and number of servings of that food.
DELIMITER //
CREATE FUNCTION calculate_calories_gained_servings (
	food_id INT,
    num_servings INT
)
RETURNS INT DETERMINISTIC
BEGIN
	DECLARE calories DECIMAL(20, 2);
	DECLARE num_grams INT;
    DECLARE gps INT;
    
	SELECT grams_per_serving
	INTO gps
    FROM food
    WHERE id = food_id;
    
    SET num_grams = num_servings * gps;
    
    SET calories = calculate_calories_gained_grams(food_id, num_grams);
    
    RETURN calories;
END//
DELIMITER ;

-- Calculate calories gained given a food id and number of grams of that food.
DELIMITER //
CREATE FUNCTION calculate_calories_gained_grams (
	food_id INT,
    num_grams INT
)
RETURNS INT DETERMINISTIC
BEGIN
	DECLARE calories DECIMAL(20, 2);
    
    DECLARE cals_per_100g INT;
    DECLARE cals_per_g DECIMAL(20, 2);
    
    SELECT calories_per_100g 
	INTO cals_per_100g
    FROM food 
    WHERE id = food_id;
    
	SET cals_per_g = cals_per_100g / 100;
    
    SET calories = num_grams * cals_per_g;
    
    RETURN calories;
END//
DELIMITER ;