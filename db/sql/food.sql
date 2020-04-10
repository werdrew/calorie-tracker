-- CREATE
CREATE TABLE IF NOT EXISTS cs3200_project.food (
    id INT NOT NULL AUTO_INCREMENT,
    type_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    grams_per_serving INT NOT NULL,
    calories_per_100g INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (type_id) REFERENCES cs3200_project.food_type(id)
      ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- This table defines types of foods.
CREATE TABLE IF NOT EXISTS cs3200_project.food_type (
	id INT NOT NULL AUTO_INCREMENT,
	type VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);
DROP TABLE food_type;

-- This table defines a user's food log -- the food a user has eaten on a given day.
CREATE TABLE IF NOT EXISTS cs3200_project.food_log (
	user_id INT NOT NULL,
	food_id INT NOT NULL,
    date DATE NOT NULL,
    -- Either num_servings or num_grams is required
    num_servings INT,
    num_grams INT,
    calories_gained DECIMAL(20, 3) DEFAULT 0 NOT NULL, -- derived
    PRIMARY KEY (user_id, food_id, date),
	  FOREIGN KEY (food_id) REFERENCES cs3200_project.food(id)
		  ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
		  ON UPDATE CASCADE ON DELETE CASCADE
);

-- This table defines "ownership" of a food item -- a user owns a food if they created it.
-- If no user owns it, then it can't be deleted and it's one of the pre-entered foods.
CREATE TABLE IF NOT EXISTS cs3200_project.user_food (
    user_id INT NOT NULL,
	  food_id INT NOT NULL,
    PRIMARY KEY (food_id, user_id),
	  FOREIGN KEY (food_id) REFERENCES cs3200_project.food(id)
	    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
		  ON UPDATE CASCADE ON DELETE CASCADE
);

-- Triggers
DELIMITER //
CREATE TRIGGER set_calories_gained_before_insert
BEFORE INSERT
ON food_log FOR EACH ROW
BEGIN
	DECLARE cals_gained DECIMAL(20, 2);
    
    CASE
		WHEN NEW.num_servings IS NOT NULL THEN SET cals_gained = calculate_calories_gained_servings(NEW.food_id, NEW.num_servings);
        WHEN NEW.num_grams IS NOT NULL THEN SET cals_gained = calculate_calories_gained_grams(NEW.food_id, NEW.num_grams);
	END CASE;
    
	SET NEW.calories_gained = cals_gained;
END//
DELIMITER ;

DELIMITER //
CREATE TRIGGER set_calories_gained_before_update
BEFORE UPDATE
ON food_log FOR EACH ROW
BEGIN
	DECLARE cals_gained DECIMAL(20, 2);
    
    CASE
		WHEN NEW.num_servings IS NOT NULL THEN SET cals_gained = calculate_calories_gained_servings(NEW.food_id, NEW.num_servings);
        WHEN NEW.num_grams IS NOT NULL THEN SET cals_gained = calculate_calories_gained_grams(NEW.food_id, NEW.num_grams);
	END CASE;
    
	SET NEW.calories_gained = cals_gained;
END//
DELIMITER ;