CREATE OR REPLACE FUNCTION get_all_users()
RETURNS SETOF users AS $$
BEGIN
    RETURN QUERY SELECT * FROM users;
END;
$$
LANGUAGE plpgsql;

-- delete a user

CREATE OR REPLACE FUNCTION usp_DeleteUser(
  IN p_id VARCHAR(36)
) RETURNS void AS $$
BEGIN
  DELETE FROM users
  WHERE id = p_id;
END;
$$
LANGUAGE plpgsql;

-- update a user
CREATE OR REPLACE FUNCTION usp_UpdateUser(
    IN p_id VARCHAR(36),
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
) RETURNS void AS $$
BEGIN
    UPDATE users SET
        name = COALESCE(p_name, name),
        email = COALESCE(p_email, email),
        password = COALESCE(p_password, password),
        updated_at = NOW()
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;

-- find one user
CREATE OR REPLACE FUNCTION get_user_by_id(
    user_id VARCHAR(36)
)
RETURNS SETOF users AS $$
BEGIN
    RETURN QUERY SELECT * FROM users WHERE id = user_id;
END;
$$
LANGUAGE plpgsql;

-- add a user
CREATE OR REPLACE FUNCTION usp_AddUser(
    IN p_name VARCHAR(190),
    IN p_email VARCHAR(190),
    IN p_password VARCHAR(100)
) RETURNS void AS $$
BEGIN
    INSERT INTO users (name, email, password, created_at, updated_at)
    VALUES (p_name, p_email, p_password, NOW(), NOW());
END;
$$ LANGUAGE plpgsql;

-- select a user using email 
CREATE OR REPLACE FUNCTION usp_GetUserByEmail(
    IN p_email VARCHAR(190)
) RETURNS SETOF users AS $$
BEGIN
    RETURN QUERY SELECT * FROM users WHERE email = p_email;
END;
$$ LANGUAGE plpgsql;
