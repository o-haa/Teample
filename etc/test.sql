INSERT INTO user VALUES ('admin', 'admin', '관리자', '관리자', '999999', '남자', '01012341234', '01012341234', 1);

INSERT INTO board (title, content, nickname, date, userid) VALUES ('hi_b', 'gggg', 'bitkunst', CURRENT_TIMESTAMP, 'bitkunst');

SELECT idx, title, content, nickname, DATE_FORMAT(date, "%Y-%m-%d %r") AS date, likes, view, userid, comment, DATE_FORMAT(c_date, "%Y-%m-%d %r") AS c_date, c_nickname, cid, c_userid FROM board LEFT JOIN comment ON board.idx=comment.bid WHERE board.idx=1;

SELECT s_idx, s_userid, idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM scrap LEFT JOIN board ON scrap.bid=board.idx;

SELECT idx, title, DATE_FORMAT(date, "%Y-%m-%d") AS date, view, likes FROM user LEFT JOIN board ON user.userid=board.userid WHERE user.userid='admin';