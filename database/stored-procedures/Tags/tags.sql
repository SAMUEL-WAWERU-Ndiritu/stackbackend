CREATE OR REPLACE FUNCTION get_tagg_by_id(p_tag_id varchar(36))
RETURNS TABLE (
    tag_id varchar(36),
    tagname varchar(190),
    tag_description text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
)
AS $$
BEGIN
    RETURN QUERY SELECT id as tag_id, tags.tagname, tags.description as tag_description, tags.created_at, tags.updated_at FROM tags WHERE id = p_tag_id;
END;
$$ LANGUAGE plpgsql;


--  fetch all tags
CREATE OR REPLACE FUNCTION gett_all_tags()
RETURNS TABLE (
  tag_id varchar(36),
  tagname varchar(190),
  tag_description text,
  created_at timestamp without time zone,
  updated_at timestamp without time zone
) AS $$
BEGIN
  RETURN QUERY SELECT id as tag_id, tags.tagname, tags.description as tag_description, tags.created_at, tags.updated_at FROM tags;
END;
$$ LANGUAGE plpgsql;
