import { useState, useEffect } from "react";
import SendBtn from "../Buttons/SendBtn";
import api from "../../services/api";
import { useComments } from "../../context/CommentsContext";

import LoadingModal from "../common/Modal/LoadingModal";

const AddCommentBox = ({ text, content }) => {
  const [contentComment, setContentComment] = useState(content);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setShowLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState("");

  const { updateComments } = useComments();

  const handleShowLoadingModal = () => setShowLoading(true);
  const handleCloseLoadingModal = () => setShowLoading(false);

  useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const response = await api.get("/users/juliusomo"); //to get other users, use their username
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuario:", error);
      }
    };
    handleCurrentUser();
  }, []);

  const handleNewComment = async () => {
    if(contentComment.length <= 0) return;
    handleShowLoadingModal();
    setMessageLoading("Creating your comment");
    
    try {
      const response = await api.post("/comments", {
        content: contentComment,
        score: 0,
        user: { username: currentUser.username },
        replies: [],
      });

      if (response.status === 201) {
        console.log(response.data);
        await updateComments();
        handleCloseLoadingModal();
      } else {
        console.warn("Error creating your comment");
        handleCloseLoadingModal();
      }
      setContentComment("");
    } catch (error) {
      console.error("Erro:", error);
      handleCloseLoadingModal();
      setContentComment("");
    }
  };

  return (
    <div className="flex justify-between gap-4 px-3 py-4 rounded-lg bg-white min-w-[630px] max-sm:min-w-[95%]">
      <LoadingModal
        showModal={loading}
        closeModal={handleCloseLoadingModal}
        textModal={messageLoading}
      />
      <div className="flex gap-4 w-full max-sm:flex-col-reverse">
        {currentUser && (
          <img
            src={currentUser.image.webp}
            className="w-6 h-6 max-sm:hidden"
            alt={`${currentUser.username}-picture`}
          />
        )}
        <div className="flex items-center jusitify-between sm:hidden">
          <div className="flex items-center justify-between py-1 w-full">
            {currentUser && (
              <img
                src={currentUser.image.webp}
                className="w-8 h-8 sm:hidden"
                alt={`${currentUser.username}-picture`}
              />
            )}
            <SendBtn action={async () => handleNewComment()} text={text} />
          </div>
        </div>
        <textarea
          className="px-4 py-2 border text-sm text-neutral-dark-blue placeholder:font-light w-full rounded-lg  resize-none focus:outline-primary-moderate-blue"
          placeholder="Add a comment..."
          rows={3}
          value={contentComment}
          onChange={(e) => setContentComment(e.target.value)}
        />
      </div>
      <div className="flex max-sm:hidden">
        <SendBtn action={async () => handleNewComment()} text={text} />
      </div>
    </div>
  );
};

export default AddCommentBox;
