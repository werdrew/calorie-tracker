-- Template.
DELIMITER //
CREATE FUNCTION function_template
(
	var -- INPUT TYPE
)
RETURNS -- RETURN TYPE
DETERMINISTIC READS SQL DATA
BEGIN
    -- BODY
END//
DELIMITER ;

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

-- Calculate the number of calories gained by a user on a date.
DELIMITER //
CREATE FUNCTION get_cals_in_for_date
(
	date DATE,
    uid INT
)
RETURNS INT
DETERMINISTIC READS SQL DATA
BEGIN
	DECLARE cals_in_for_date DECIMAL(20, 2);
    
    SELECT SUM(fl.calories_gained)
    INTO cals_in_for_date
	FROM food_log fl
	WHERE fl.user_id = uid
	AND fl.date = date;

	RETURN IFNULL(cals_in_for_date, 0);
END//
DELIMITER ;

-- Calculate the number of calories lost by a user on a date.
DELIMITER //
CREATE FUNCTION get_cals_out_for_date
(
	date DATE,
    uid INT
)
RETURNS INT
DETERMINISTIC READS SQL DATA
BEGIN
	DECLARE cals_out_for_date DECIMAL(20, 2);

    SELECT SUM(el.calories_lost)
    INTO cals_out_for_date
	FROM exercise_log el
	WHERE el.user_id = uid
	AND el.date = date;
    
    RETURN IFNULL(cals_out_for_date, 0);
END//
DELIMITER ;