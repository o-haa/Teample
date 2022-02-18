CREATE TABLE board (
    idx INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    username VARCHAR(20) NOT NULL,
    date TIMESTAMP NOT NULL,
    view INT NOT NULL
);

--INSERT INTO board (title, content, username, date, view) VALUES ('hi', '안녕하세요', 'ingoo', CURRENT_TIMESTAMP, 1);