import Comment from "./Comment";
import { useComments } from "../../context/CommentsContext";

const CommentList = () => {
  const { comments } = useComments();

  return (
    <div className="flex flex-col gap-1 mb-8">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          commentId={comment.id}
          avatarUser={comment.user?.image?.webp}
          user={comment.user?.username}
          dateAtCreated={comment?.createdAt}
          content={comment?.content}
          voteCounter={comment?.score}
          replies={comment?.replies}
        />
      ))}
    </div>
  );
};

export default CommentList;
