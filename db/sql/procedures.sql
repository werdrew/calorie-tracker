-- Procedure Template
DELIMITER //
CREATE PROCEDURE procedure_template
(
	IN var1 INT,
    OUT var2 INT
)
BEGIN
    DECLARE sql_error TINYINT DEFAULT FALSE;
    
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
   	 SET sql_error = TRUE;
   	 
    START TRANSACTION;

	-- BODY

	IF sql_error = FALSE THEN
		COMMIT;
    ELSE
		ROLLBACK;
    END IF;
END//
DELIMITER ;

-- Procedures

DELIMITER //
CREATE PROCEDURE calculate_net_calories_today
(
	IN date DATE,
    IN uid INT
)
BEGIN
    DECLARE sql_error TINYINT DEFAULT FALSE;
    
	DECLARE cals_in DECIMAL(20, 2);
    DECLARE cals_out DECIMAL(20, 2);
    DECLARE bmr INT;
    
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		SET sql_error = TRUE;
	

    START TRANSACTION;

    SET cals_in = get_cals_in_for_date(date, uid);
    SET cals_out = get_cals_out_for_date(date, uid);
    SELECT u.bmr INTO bmr FROM user u WHERE id = uid;
    
    SELECT cals_in - cals_out - bmr AS net_cals;

	IF sql_error = FALSE THEN
		COMMIT;
    ELSE
		ROLLBACK;
    END IF;
END//
DELIMITER ;