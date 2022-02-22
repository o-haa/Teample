INSERT INTO user VALUES ('jjc', '1111', '장주찬', '찬', 999999, '남자', 12341234, 01012341234, 3);

INSERT INTO board (title, content, nickname, date, userid) VALUES ('hi_b', 'gggg', 'bitkunst', CURRENT_TIMESTAMP, 'bitkunst');

SELECT idx, title, content, nickname, DATE_FORMAT(date, "%Y-%m-%d %r") AS date, likes, view, userid, comment, DATE_FORMAT(c_date, "%Y-%m-%d %r") AS c_date, c_nickname, cid, c_userid FROM board LEFT JOIN comment ON board.idx=comment.bid WHERE board.idx=1;

SELECT s_idx, s_userid, idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM scrap LEFT JOIN board ON scrap.bid=board.idx;