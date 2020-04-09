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
    type VARCHAR(255) NOT NULL,
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
	FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id),
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
);

-- This table defines how many calories an exercise burns at a given weight.
-- Weights not in the table can be extrapolated based on the entries in this table.
CREATE TABLE IF NOT EXISTS cs3200_project.calories_burned (
	exercise_id INT NOT NULL,
    at_130_lb INT NOT NULL,
    at_155_lb INT NOT NULL,
    at_180_lb INT NOT NULL,
    at_205_lb INT NOT NULL,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id)
);

-- This table defines "ownership" of an exercise item item -- a user owns a food if they created it.
-- If no user owns it, then it can't be deleted and it's one of the pre-entered foods.
CREATE TABLE IF NOT EXISTS cs3200_project.user_exercise (
	user_id INT NOT NULL,
	exercise_id INT NOT NULL,
    PRIMARY KEY (exercise_id, user_id),
	FOREIGN KEY (exercise_id) REFERENCES cs3200_project.exercise(id),
    FOREIGN KEY (user_id) REFERENCES cs3200_project.user(id)
);

-- Triggers