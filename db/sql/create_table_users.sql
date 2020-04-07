CREATE TABLE IF NOT EXISTS cs3200_project.user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    sex CHAR(1) NOT NULL,
    dob DATE NOT NULL,
    age INT DEFAULT 0,
    height INT NOT NULL,
    weight INT NOT NULL,
    PRIMARY KEY (id)
)