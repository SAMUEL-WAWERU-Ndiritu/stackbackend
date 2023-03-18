CREATE OR REPLACE FUNCTION get_question_by_id(question_id integer)
  RETURNS TABLE (id SERIAL PRIMARY KEY, title varchar(190), body text, tags varchar(500), views integer, created_at timestamp without time zone, updated_at timestamp without time zone, user_id integer)
AS $$
BEGIN
  RETURN QUERY SELECT id, title, body, tags, views, created_at, updated_at, user_id
               FROM questions
               WHERE id = question_id;
END;
$$ LANGUAGE plpgsql;



-- delete a single question by id
CREATE OR REPLACE FUNCTION delete_question_by_id(question_id integer)
  RETURNS void
AS $$
BEGIN
  DELETE FROM questions WHERE id = question_id;
END;
$$ LANGUAGE plpgsql;



-- fetch all questions
CREATE OR REPLACE FUNCTION get_all_questions()
  RETURNS TABLE (id SERIAL PRIMARY KEY, title varchar(190), body text, tags varchar(500), views integer, created_at timestamp without time zone, updated_at timestamp without time zone, user_id integer)
AS $$
BEGIN
  RETURN QUERY SELECT id, title, body, tags, views, created_at, updated_at, user_id
               FROM questions;
END;
$$ LANGUAGE plpgsql;
