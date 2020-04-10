-- CREATE
CREATE TABLE IF NOT EXISTS cs3200_project.exercise (
	id INT NOT NULL AUTO_INCREMENT,
    type_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (type_id) REFERENCES cs3200_project.exercise_type(id)
		ON UPDATE RESTRICT ON DELETE RESTRICT
);
DROP TABLE cs3200_project.exercise;

-- This table defines types of exercises.
CREATE TABLE IF NOT EXISTS cs3200_project.exercise_type (
	id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

-- This table defines a user's exercise log -- the exercise a user has done on a given day.
CREATE TABLE IF NOT EXISTS cs3200_project.exercise_log (
	user_id INT NOT NULL,
	exercise_id INT NOT NULL,
    date DATE NOT NULL,
	minutes_performed INT NOT NULL,
    calories_lost INT NOT NULL, -- derived
    PRIMARY KEY (user_id, exercise_id, date),
	FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- This table defines how many calories an exercise burns at a given weight.
-- Weights not in the table can be extrapolated based on the entries in this table.
CREATE TABLE IF NOT EXISTS cs3200_project.calories_burned (
	exercise_id INT NOT NULL,
    -- Default values taken from here: 
    -- https://www.howmany.wiki/calories-burned/Calories-burned_walking_60_minutes
    -- Assumption: the average custom exercise will be at least as strenuous as walking.
    at_130_lb DECIMAL(20, 3) DEFAULT 207 NOT NULL,
    at_155_lb DECIMAL(20, 3) DEFAULT 246 NOT NULL,
    at_180_lb DECIMAL(20, 3) DEFAULT 286 NOT NULL,
    at_205_lb DECIMAL(20, 3) DEFAULT 326 NOT NULL,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id)
		ON UPDATE CASCADE ON DELETE CASCADE
);

-- This table defines "ownership" of an exercise item item -- a user owns a food if they created it.
-- If no user owns it, then it can't be deleted and it's one of the pre-entered foods.
CREATE TABLE IF NOT EXISTS cs3200_project.user_exercise (
	user_id INT NOT NULL,
	exercise_id INT NOT NULL,
    PRIMARY KEY (exercise_id, user_id),
	FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- TRIGGERS
DELIMITER //
CREATE TRIGGER set_calories_lost_before_update
BEFORE UPDATE
ON exercise_log FOR EACH ROW
BEGIN
	DECLARE calories_lost DECIMAL(20, 2);
    DECLARE mins_in_hours DECIMAL(20, 2);
    DECLARE weight INT;
    
    DECLARE delta_y DECIMAL(20, 2);
    DECLARE delta_x DECIMAL(20, 2);
    DECLARE slope DECIMAL(20, 2);
    DECLARE y_intercept DECIMAL(20, 2);
    
    DECLARE at_130_lb DECIMAL(20, 2);
	DECLARE at_155_lb DECIMAL(20, 2);
    DECLARE at_180_lb DECIMAL(20, 2);
    DECLARE at_205_lb DECIMAL(20, 2);

    -- Convert minutes to hours.
    SET mins_in_hours = NEW.minutes_performed / 60;

    -- Get the user's weight.
    SELECT u.weight INTO weight FROM cs3200_project.user u WHERE u.id = NEW.user_id;

	-- Get the calories burned at each known weight.
	SELECT cb.at_130_lb INTO at_130_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_155_lb INTO at_155_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_180_lb INTO at_180_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_205_lb INTO at_205_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;

    -- Find the two points closest to the user's weight.
    
    CASE
		-- These are known, so set them immediately:
		WHEN weight = 130 THEN SET calories_lost = at_130_lb;
        WHEN weight = 155 THEN SET calories_lost = at_155_lb;
		WHEN weight = 180 THEN SET calories_lost = at_180_lb;
        WHEN weight = 205 THEN SET calories_lost = at_205_lb;
        -- These are roughly estimated by using the two
        -- nearest known points to construct a line.
        -- For weight < 130, we use (0,0), and for
        -- weight > 205, we use the same line as between
        -- 180 and 205. Weight is x, cals_burned is y.
		WHEN weight < 130 THEN
			SET delta_y = at_130_lb;
            SET delta_x = 130;
            SET slope = delta_y / delta_x;
            SET y_intercept = 0;
            SET calories_lost = (slope * weight + y_intercept) * mins_in_hours;
        WHEN weight > 130 AND weight < 155 THEN
			SET delta_y = at_155_lb - at_130_lb;
            SET delta_x = 25;
            SET slope = delta_y / delta_x;
            SET y_intercept = at_130_lb;
            SET calories_lost = (slope * (weight - 130) + y_intercept) * mins_in_hours;
        WHEN weight > 155 AND weight < 180 THEN
			SET delta_y = at_180_lb - at_155_lb;
			SET delta_x = 25;
            SET slope = delta_y / delta_x;
			SET y_intercept = at_155_lb;
			SET calories_lost = (slope * (weight - 155) + y_intercept) * mins_in_hours;
        WHEN weight > 180 AND weight < 205 OR weight > 205 THEN
			SET delta_y = at_205_lb - at_180_lb;
			SET delta_x = 25;
            SET slope = delta_y / delta_x;
            SET y_intercept = at_180_lb;
            SET calories_lost = (slope * (weight - 180) + y_intercept) * mins_in_hours;
    END CASE;
    
    SET NEW.calories_lost = calories_lost;
END//
DELIMITER ;

SELECT u.weight FROM cs3200_project.user u WHERE u.id = 1;
SELECT cb.at_205_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = 250;

DELIMITER //
CREATE TRIGGER set_calories_lost_before_insert
BEFORE INSERT
ON exercise_log FOR EACH ROW
BEGIN
	DECLARE calories_lost DECIMAL(20, 2);
    DECLARE mins_in_hours DECIMAL(20, 2);
    DECLARE weight INT;
    
    DECLARE delta_y DECIMAL(20, 2);
    DECLARE delta_x DECIMAL(20, 2);
    DECLARE slope DECIMAL(20, 2);
    DECLARE y_intercept DECIMAL(20, 2);
    
    DECLARE at_130_lb DECIMAL(20, 2);
	DECLARE at_155_lb DECIMAL(20, 2);
    DECLARE at_180_lb DECIMAL(20, 2);
    DECLARE at_205_lb DECIMAL(20, 2);

    -- Convert minutes to hours.
    SET mins_in_hours = NEW.minutes_performed / 60;

    -- Get the user's weight.
    SELECT u.weight INTO weight FROM cs3200_project.user u WHERE u.id = NEW.user_id;

	-- Get the calories burned at each known weight.
	SELECT cb.at_130_lb INTO at_130_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_155_lb INTO at_155_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_180_lb INTO at_180_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;
	SELECT cb.at_205_lb INTO at_205_lb FROM cs3200_project.calories_burned cb WHERE cb.exercise_id = NEW.exercise_id;

    -- Find the two points closest to the user's weight.
    
    CASE
		-- These are known, so set them immediately:
		WHEN weight = 130 THEN SET calories_lost = at_130_lb;
        WHEN weight = 155 THEN SET calories_lost = at_155_lb;
		WHEN weight = 180 THEN SET calories_lost = at_180_lb;
        WHEN weight = 205 THEN SET calories_lost = at_205_lb;
        -- These are roughly estimated by using the two
        -- nearest known points to construct a line.
        -- For weight < 130, we use (0,0), and for
        -- weight > 205, we use the same line as between
        -- 180 and 205. Weight is x, cals_burned is y.
		WHEN weight < 130 THEN
			SET delta_y = at_130_lb;
            SET delta_x = 130;
            SET slope = delta_y / delta_x;
            SET y_intercept = 0;
            SET calories_lost = (slope * weight + y_intercept) * mins_in_hours;
        WHEN weight > 130 AND weight < 155 THEN
			SET delta_y = at_155_lb - at_130_lb;
            SET delta_x = 25;
            SET slope = delta_y / delta_x;
            SET y_intercept = at_130_lb;
            SET calories_lost = (slope * (weight - 130) + y_intercept) * mins_in_hours;
        WHEN weight > 155 AND weight < 180 THEN
			SET delta_y = at_180_lb - at_155_lb;
			SET delta_x = 25;
            SET slope = delta_y / delta_x;
			SET y_intercept = at_155_lb;
			SET calories_lost = (slope * (weight - 155) + y_intercept) * mins_in_hours;
        WHEN weight > 180 AND weight < 205 OR weight > 205 THEN
			SET delta_y = at_205_lb - at_180_lb;
			SET delta_x = 25;
            SET slope = delta_y / delta_x;
            SET y_intercept = at_180_lb;
            SET calories_lost = (slope * (weight - 180) + y_intercept) * mins_in_hours;
    END CASE;
    
    SET NEW.calories_lost = calories_lost;
END//
DELIMITER ;