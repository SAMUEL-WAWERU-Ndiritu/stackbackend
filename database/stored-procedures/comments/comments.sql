-- to add a comment
CREATE OR REPLACE FUNCTION add_question_comment(
    comment_body TEXT,
    user_id VARCHAR(36),
    question_id VARCHAR(36)
)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO question_comments (body, created_at, updated_at, user_id, question_id)
    VALUES (comment_body, NOW(), NOW(), user_id, question_id);
END;
$$
LANGUAGE plpgsql;

-- to delete a comment by id
CREATE OR REPLACE FUNCTION usp_DeleteQuestionCommentById(
    IN comment_id VARCHAR(36)
) 
RETURNS VOID AS $$
BEGIN
    DELETE FROM question_comments
    WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql;

-- to fecth all comments 
CREATE OR REPLACE FUNCTION usp_GetAllComments()
RETURNS TABLE (
    id VARCHAR(36),
    body TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id VARCHAR(36),
    question_id VARCHAR(36)
)
AS $$
BEGIN
    RETURN QUERY SELECT id, body, created_at, updated_at, user_id, question_id
                 FROM question_comments;
END;
$$ LANGUAGE plpgsql;

-- to get a single comment by id 
CREATE OR REPLACE FUNCTION get_comment_by_id(comment_id VARCHAR(36))
  RETURNS TABLE (
    id VARCHAR(36),
    body TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    user_id VARCHAR(36),
    question_id VARCHAR(36)
  )
AS $$
BEGIN
  RETURN QUERY SELECT id, body, created_at, updated_at, user_id, question_id
               FROM question_comments
               WHERE id = comment_id;
END;
$$ LANGUAGE plpgsql;

-- to get comments by user id
CREATE OR REPLACE FUNCTION get_comments_by_user(user_id VARCHAR(36))
RETURNS SETOF question_comments
AS $$
BEGIN
    RETURN QUERY SELECT * FROM question_comments WHERE user_id = $1;
END;
$$ LANGUAGE plpgsql;
