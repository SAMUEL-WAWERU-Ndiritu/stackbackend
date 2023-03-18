-- to add a question
CREATE OR REPLACE FUNCTION add_question(
    IN title varchar(190),
    IN body text,
    IN tags varchar(500),
    IN user_id varchar(36)
)
RETURNS void
AS $$
BEGIN
    INSERT INTO questions (id, title, body, tags, user_id, created_at, updated_at)
    VALUES (uuid_generate_v4(), title, body, tags, user_id, NOW(), NOW());
END;
$$
LANGUAGE plpgsql;

-- fetch all questions
CREATE OR REPLACE FUNCTION gett_all_questions()
RETURNS SETOF questions AS
$$
BEGIN
    RETURN QUERY SELECT * FROM questions;
END;
$$
LANGUAGE plpgsql;

-- to get a single question by id
CREATE OR REPLACE FUNCTION usp_GetQuestionById(
    IN p_id varchar(36)
) RETURNS TABLE (
    id varchar(36),
    title VARCHAR(190),
    body TEXT,
    tags VARCHAR(500),
    views INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36)
) AS '
BEGIN
    RETURN QUERY SELECT id, title, body, tags, views, created_at, updated_at, user_id
    FROM questions
    WHERE id = p_id;
END;'
LANGUAGE plpgsql;

-- to retrieve the user information along with the question information
DROP FUNCTION IF EXISTS usp_GetQuestionById(character varying);

CREATE OR REPLACE FUNCTION usp_GetQuestionById(
    IN p_id varchar(36)
) RETURNS TABLE (
    question_id varchar(36),
    title VARCHAR(190),
    body TEXT,
    tags VARCHAR(500),
    views INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36),
    user_name VARCHAR(190),
    user_email VARCHAR(190),
    user_views INTEGER,
    user_created_at TIMESTAMP WITHOUT TIME ZONE,
    user_updated_at TIMESTAMP WITHOUT TIME ZONE
) AS $$
BEGIN
    RETURN QUERY SELECT q.id, q.title, q.body, q.tags, q.views, q.created_at, q.updated_at, q.user_id,
    u.name, u.email, u.views, u.created_at, u.updated_at
    FROM questions q
    JOIN users u ON q.user_id = u.id
    WHERE q.id = p_id;
END;
$$ LANGUAGE plpgsql;



-- to delete a question by id 
CREATE OR REPLACE FUNCTION usp_DeleteQuestionById(
    IN p_id varchar(36)
) RETURNS void AS $$
BEGIN
    DELETE FROM questions
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;


-- to gate a question by tagname
CREATE OR REPLACE FUNCTION usp_GetQuestionByTagname(
    IN p_tagname varchar(500)
) RETURNS TABLE (
    id varchar(36),
    title VARCHAR(190),
    body TEXT,
    tags VARCHAR(500),
    views INTEGER,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36)
) AS $$
BEGIN
    RETURN QUERY SELECT id, title, body, tags, views, created_at, updated_at, user_id
    FROM questions
    WHERE tags LIKE '%' || p_tagname || '%'
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;
