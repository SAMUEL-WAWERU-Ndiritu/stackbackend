-- to Upvote or downvote an answer(Note: The voteType parameter should be either 'upvote' or 'downvote'.)
CREATE OR REPLACE FUNCTION usp_VoteOnAnswer(
    IN userId INT,
    IN answerId INT,
    IN voteType VARCHAR(10)
)
RETURNS VOID
AS $$
BEGIN
    -- Check if the user has already voted on this answer
    IF EXISTS (
        SELECT 1 FROM votes WHERE user_id = userId AND post_id = answerId
    ) THEN
        -- If user has already voted, update the existing vote
        UPDATE votes SET vote_type = voteType, updated_at = NOW()
        WHERE user_id = userId AND post_id = answerId;
    ELSE
        -- If user has not yet voted, insert a new vote
        INSERT INTO votes (user_id, post_id, vote_type, created_at, updated_at)
        VALUES (userId, answerId, voteType, NOW(), NOW());
    END IF;
END;
$$ LANGUAGE plpgsql;
