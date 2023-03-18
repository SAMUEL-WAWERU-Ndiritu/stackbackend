export interface Comment {
    id: number;
    body: string;
    user_id: number;
    question_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
 export interface CommentModel {
    getAllCommentsForQuestion(questionId: number): Promise<Comment[]>;
    addComment(comment: Comment): Promise<Comment>;
    deleteComment(commentId: number): Promise<void>;
  }
  
  