import { useState } from "react";
import CancelBtn from "../../Buttons/CancelBtn";
import ConfirmDeleteBtn from "../../Buttons/ConfirmDeleteBtn";
import LoadingModal from "./LoadingModal";
import api from "../../../services/api";
import { useComments } from "../../../context/CommentsContext";

const DeleteModal = ({
  showProp,
  closeProp,
  commentId,
  replyId,
  reply = false,
}) => {
  const message =
    "Are you sure you want to delete this comment? This Will remove the comment and can't be undone";

  const handleCloseModal = () => {
    closeProp();
  };

  const [loading, setShowLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState("");

  const { updateComments } = useComments();

  const handleDeleteComment = async () => {
    setShowLoading(true);
    setMessageLoading("Deleting your comment...")
    try {
      const response = await api.delete(`/comments/${commentId}`);
      if (response.status === 200) {
        console.log("Comment Deleted");
        setShowLoading(false)
        await updateComments()
      } else {
        console.warn("Failed to delete comment");
        setShowLoading(false)
      }
    } catch (error) {
      console.error("Error deleting comment", error);
      setShowLoading(false)
    }
  };

  const handleDeleteReply = async (replyId) => {
    setShowLoading(true);
    setMessageLoading("Deleting your reply...")
    try {
      const response = await api.delete(
        `/comments/${commentId}/replies/${replyId}`
      );
      if (response.status === 200) {
        console.log("Reply Deleted");
        setShowLoading(false)
        await updateComments()
      } else {
        console.warn("Failed to delete reply");
        setShowLoading(false)
      }
    } catch (error) {
      console.error("Error deleting reply", error);
      setShowLoading(false)
    }
  };

  if (!showProp) return null;
  return (
    <div onClick={handleCloseModal} className="flex justify-center items-center bg-black/25 fixed left-0 top-0 w-full h-full">
      <LoadingModal
        showModal={loading}
        textModal={messageLoading}
      />
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-5 bg-white rounded-md p-5 max-w-[280px]">
        <h1 className="text-neutral-dark-blue text-base font-medium">
          Delete Comment
        </h1>
        <p className="text-sm text-neutral-grayish-blue font-light w-fit">
          {message}
        </p>
        <div className="flex items-center justify-center w-full gap-3">
          <CancelBtn action={handleCloseModal} />
          <ConfirmDeleteBtn
            action={async () => {
              if (reply) {
                await handleDeleteReply(replyId, commentId);
                handleCloseModal();
              } else {
                await handleDeleteComment(commentId);
                handleCloseModal();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
