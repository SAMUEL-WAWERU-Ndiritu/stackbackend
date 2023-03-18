CREATE OR REPLACE FUNCTION usp_DeleteAnswerById(
    answerId varchar(36)
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM answers
    WHERE id = answerId;
END;
$$;


-- to get all answers
CREATE OR REPLACE FUNCTION usp_GetAllAnswers()
RETURNS TABLE (
    id varchar(36),
    body text,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36),
    question_id varchar(36)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT *
    FROM answers;
END;
$$;



-- to get an answer by id
CREATE OR REPLACE FUNCTION usp_GetAnswerById(
    answerId varchar(36)
)
RETURNS TABLE (
    id varchar(36),
    body TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36),
    question_id varchar(36)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
    FROM answers
    WHERE id = answerId;
END;
$$ LANGUAGE plpgsql;


-- to get an answer by userid
CREATE OR REPLACE FUNCTION usp_GetAnswersByUserId(userId varchar(36))
RETURNS TABLE (
    id varchar(36),
    body TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id varchar(36),
    question_id varchar(36)
)
AS $$
BEGIN
    RETURN QUERY SELECT *
    FROM answers
    WHERE user_id = userId;
END;
$$ LANGUAGE plpgsql;
